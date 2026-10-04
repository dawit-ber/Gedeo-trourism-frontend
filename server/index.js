import http from 'node:http';
import { randomUUID } from 'node:crypto';
import { readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const apiOnly = process.argv.includes('--api-only');
const pendingPayments = new Map();
const bookSlugs = new Set([
  'gedeo-culture-and-traditions', 'coffee-and-livelihoods', 'gedeo-history',
  'sustainable-tourism', 'local-governance', 'gedeo-language-and-culture',
  'highland-coffee-study', 'stories-from-gedeo',
]);
const mimeTypes = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.webp': 'image/webp', '.woff2': 'font/woff2' };

try {
  const envText = await readFile(path.join(root, '.env'), 'utf8');
  for (const line of envText.split(/\r?\n/)) {
    const match = line.match(/^\s*(?:export\s+)?([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*?)\s*$/);
    if (match && process.env[match[1]] === undefined) process.env[match[1]] = match[2].replace(/^(?:"([\s\S]*)"|'([\s\S]*)')$/, (_, double, single) => double ?? single);
  }
} catch (error) {
  if (error.code !== 'ENOENT') throw error;
}

const port = Number(process.env.API_PORT || process.env.PORT || (apiOnly ? 8787 : 3000));
const appUrl = (process.env.APP_URL || (apiOnly ? 'http://localhost:5173' : '')).replace(/\/$/, '');

function send(res, status, data) {
  res.writeHead(status, { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' });
  res.end(JSON.stringify(data));
}

async function readJson(req) {
  let body = '';
  for await (const chunk of req) {
    body += chunk;
    if (body.length > 12_000) throw new Error('Request is too large.');
  }
  return JSON.parse(body || '{}');
}

function getPrice(slug) {
  const key = `PRINT_PRICE_${slug.toUpperCase().replace(/[^A-Z0-9]+/g, '_')}_ETB`;
  const raw = process.env[key];
  const amount = Number(raw);
  if (!raw || !Number.isFinite(amount) || amount <= 0 || !/^\d+(\.\d{1,2})?$/.test(raw)) return null;
  return amount;
}

async function chapaVerify(txRef) {
  const response = await fetch(`https://api.chapa.co/v1/transaction/verify/${encodeURIComponent(txRef)}`, {
    headers: { Authorization: `Bearer ${process.env.CHAPA_SECRET_KEY}` },
  });
  const body = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(body.message || 'Could not verify payment with Chapa.');
  return body;
}

async function handleApi(req, res, url) {
  if (req.method === 'GET' && url.pathname === '/api/chapa/price') {
    const slug = url.searchParams.get('slug') || '';
    if (!bookSlugs.has(slug)) return send(res, 404, { error: 'Publication not found.' });
    const amount = getPrice(slug);
    return send(res, 200, amount ? { available: true, amount, currency: 'ETB' } : { available: false, currency: 'ETB' });
  }

  if (req.method === 'POST' && url.pathname === '/api/chapa/initialize') {
    if (!process.env.CHAPA_SECRET_KEY) return send(res, 503, { error: 'Print checkout is not configured yet. Please contact the library team.' });
    let input;
    try { input = await readJson(req); } catch (error) { return send(res, 400, { error: error.message || 'Invalid request.' }); }
    const slug = String(input.slug || '');
    if (!bookSlugs.has(slug)) return send(res, 400, { error: 'This publication is not available for print checkout.' });
    const amount = getPrice(slug);
    if (!amount) return send(res, 503, { error: 'A print price has not been configured for this publication yet.' });
    const firstName = String(input.firstName || '').trim().slice(0, 80);
    const lastName = String(input.lastName || '').trim().slice(0, 80);
    const email = String(input.email || '').trim().slice(0, 254);
    if (!firstName || !lastName || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return send(res, 400, { error: 'Enter your first name, last name, and a valid email address.' });
    if (!appUrl) return send(res, 503, { error: 'Set APP_URL to the public address of this website before accepting payments.' });

    const txRef = `gedeo-${randomUUID()}`;
    const returnUrl = `${appUrl}/library/${slug}?tx_ref=${encodeURIComponent(txRef)}`;
    const chapaPayload = {
      amount: amount.toFixed(2), currency: 'ETB', email, first_name: firstName, last_name: lastName,
      tx_ref: txRef, return_url: returnUrl,
      callback_url: `${appUrl}/api/chapa/callback?tx_ref=${encodeURIComponent(txRef)}`,
      customization: { title: 'Gedeo Tourism', description: 'Printed publication purchase' },
    };
    try {
      const response = await fetch('https://api.chapa.co/v1/transaction/initialize', {
        method: 'POST',
        headers: { Authorization: `Bearer ${process.env.CHAPA_SECRET_KEY}`, 'Content-Type': 'application/json' },
        body: JSON.stringify(chapaPayload),
      });
      const body = await response.json().catch(() => ({}));
      const checkoutUrl = body?.data?.checkout_url;
      if (!response.ok || body.status !== 'success' || !checkoutUrl) {
        console.error('Chapa initialization failed:', body.message || response.status);
        return send(res, 502, { error: 'Chapa could not start checkout. Please try again.' });
      }
      pendingPayments.set(txRef, { slug, amount, createdAt: Date.now() });
      return send(res, 200, { checkoutUrl, txRef, amount, currency: 'ETB' });
    } catch (error) {
      console.error('Chapa initialization error:', error.message);
      return send(res, 502, { error: 'Unable to connect to Chapa. Please try again.' });
    }
  }

  if (req.method === 'GET' && url.pathname === '/api/chapa/verify') {
    const txRef = url.searchParams.get('tx_ref') || '';
    const payment = pendingPayments.get(txRef);
    if (!payment) return send(res, 404, { status: 'unknown', message: 'This payment could not be matched to an active print order.' });
    if (!process.env.CHAPA_SECRET_KEY) return send(res, 503, { error: 'Payment verification is not configured.' });
    try {
      const result = await chapaVerify(txRef);
      const data = result?.data || {};
      const paidAmount = Number(data.amount);
      const verified = result.status === 'success' && data.status === 'success' && data.currency === 'ETB' && Number.isFinite(paidAmount) && paidAmount === payment.amount;
      if (verified) pendingPayments.delete(txRef);
      return send(res, 200, { status: verified ? 'success' : (data.status === 'pending' ? 'pending' : 'failed'), message: verified ? 'Payment confirmed. The library team will contact you about print delivery.' : 'Payment has not been confirmed. If you completed checkout, please try again shortly.' });
    } catch (error) {
      return send(res, 502, { error: error.message || 'Could not verify payment right now.' });
    }
  }

  if (req.method === 'GET' && url.pathname === '/api/chapa/callback') {
    const txRef = url.searchParams.get('tx_ref') || '';
    if (!pendingPayments.has(txRef) || !process.env.CHAPA_SECRET_KEY) return send(res, 404, { status: 'unknown' });
    try {
      await chapaVerify(txRef);
      return send(res, 200, { received: true });
    } catch { return send(res, 502, { received: false }); }
  }
  return send(res, 404, { error: 'API route not found.' });
}

async function serveStatic(req, res, url) {
  if (req.method !== 'GET' && req.method !== 'HEAD') return send(res, 404, { error: 'Not found.' });
  let requested = decodeURIComponent(url.pathname);
  let file = requested === '/' ? path.join(dist, 'index.html') : path.resolve(dist, `.${requested}`);
  if (!file.startsWith(`${dist}${path.sep}`) && file !== path.join(dist, 'index.html')) return send(res, 400, { error: 'Invalid path.' });
  try {
    const details = await stat(file);
    if (details.isDirectory()) file = path.join(file, 'index.html');
    const content = await readFile(file);
    res.writeHead(200, { 'content-type': mimeTypes[path.extname(file)] || 'application/octet-stream' });
    res.end(req.method === 'HEAD' ? undefined : content);
  } catch {
    try {
      const content = await readFile(path.join(dist, 'index.html'));
      res.writeHead(200, { 'content-type': 'text/html; charset=utf-8' });
      res.end(req.method === 'HEAD' ? undefined : content);
    } catch { send(res, 503, { error: 'Build the frontend with npm run build before starting the production server.' }); }
  }
}

const server = http.createServer((req, res) => {
  const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  if (url.pathname.startsWith('/api/')) {
    handleApi(req, res, url).catch((error) => {
      console.error('Payment API error:', error.message);
      if (!res.headersSent) send(res, 500, { error: 'Unexpected payment server error.' });
    });
  } else if (apiOnly) send(res, 404, { error: 'Not found.' });
  else serveStatic(req, res, url);
});
server.listen(port, () => console.log(`Gedeo ${apiOnly ? 'payment API' : 'website'} listening on port ${port}`));
