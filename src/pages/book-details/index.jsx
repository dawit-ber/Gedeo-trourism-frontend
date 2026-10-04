import React from 'react';
import { ArrowLeft, BookOpen, Download, ShoppingBag, X } from 'lucide-react';
import { libraryBooks } from '../../data/siteData.js';

export default function BookDetailsPage({ slug }) {
  const book = libraryBooks.find((item) => item.slug === slug);
  const [checkoutOpen, setCheckoutOpen] = React.useState(false);
  const [price, setPrice] = React.useState(null);
  const [priceLoading, setPriceLoading] = React.useState(false);
  const [priceUnavailable, setPriceUnavailable] = React.useState(false);
  const [paymentMessage, setPaymentMessage] = React.useState('');
  const [paymentStatus, setPaymentStatus] = React.useState('');
  const [submitting, setSubmitting] = React.useState(false);
  const [form, setForm] = React.useState({ firstName: '', lastName: '', email: '' });

  React.useEffect(() => {
    const txRef = new URLSearchParams(window.location.search).get('tx_ref');
    if (!txRef) return;
    let cancelled = false;
    setPaymentStatus('Checking payment…');
    fetch(`/api/chapa/verify?tx_ref=${encodeURIComponent(txRef)}`)
      .then(async (response) => ({ response, body: await response.json() }))
      .then(({ response, body }) => {
        if (!cancelled) {
          setPaymentStatus(body.message || body.error || (response.ok ? 'Payment status updated.' : 'Could not verify payment.'));
          if (body.status === 'success') window.history.replaceState({}, '', window.location.pathname);
        }
      })
      .catch(() => { if (!cancelled) setPaymentStatus('Could not verify your payment right now. Please contact the library team.'); });
    return () => { cancelled = true; };
  }, [slug]);

  if (!book) return <main className="book-detail-page"><a href="/library">← Back to Library</a><h1>Publication not found</h1><p>This publication may have been removed or the link may be incorrect.</p></main>;

  const requestLink = (kind) => `mailto:hello@gedeotourism.et?subject=${encodeURIComponent(`${kind}: ${book.title}`)}&body=${encodeURIComponent(`Hello, I would like to ${kind.toLowerCase()} for “${book.title}” (${book.year}).`)}`;
  const openCheckout = async () => {
    setCheckoutOpen(true);
    setPaymentMessage('');
    setPriceLoading(true);
    setPriceUnavailable(false);
    try {
      const response = await fetch(`/api/chapa/price?slug=${encodeURIComponent(book.slug)}`);
      const data = await response.json();
      if (data.available) setPrice(data.amount);
      else setPriceUnavailable(true);
    } catch {
      setPaymentMessage('Could not load print price. Please try again.');
    } finally { setPriceLoading(false); }
  };
  const startCheckout = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    setPaymentMessage('Connecting to Chapa…');
    try {
      const response = await fetch('/api/chapa/initialize', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, slug: book.slug }),
      });
      const data = await response.json();
      if (!response.ok || !data.checkoutUrl) throw new Error(data.error || 'Could not start checkout.');
      window.location.assign(data.checkoutUrl);
    } catch (error) {
      setPaymentMessage(error.message || 'Could not start checkout. Please try again.');
      setSubmitting(false);
    }
  };

  return <main className="book-detail-page"><style>{`
    .book-detail-page{width:100%;max-width:none;margin:0;padding:0 0 42px;color:#302044}.book-back{display:inline-flex;align-items:center;gap:7px;padding:14px clamp(16px,4vw,48px);color:#5a3285;font-size:13px!important}.book-back svg{width:15px}.book-detail-hero{display:grid;grid-template-columns:minmax(220px,.75fr) minmax(0,1.4fr);gap:clamp(20px,5vw,60px);align-items:center;padding:clamp(22px,5vw,56px) clamp(16px,8vw,100px);background:linear-gradient(135deg,#f7f2fc,#fff)}.book-detail-hero>img{width:100%;max-height:420px;aspect-ratio:4/5;object-fit:cover;border-radius:12px;box-shadow:0 12px 28px #35106f20}.book-detail-copy{max-width:650px}.book-detail-category{font-size:11px!important;font-weight:700;letter-spacing:.12em;color:#794da5;margin:0 0 8px}.book-detail-copy h1{font-size:clamp(32px,4.3vw,52px)!important;line-height:1.1!important;color:#35106b;margin:0 0 8px}.book-detail-meta{font-size:13px!important;color:#776b84;margin:0 0 18px}.book-detail-description{font-size:15px!important;line-height:1.75!important;color:#594d67;margin:0}.book-detail-actions{display:flex;flex-wrap:wrap;gap:10px;margin-top:22px}.book-detail-actions a,.book-detail-actions button{min-height:42px;display:inline-flex;align-items:center;justify-content:center;gap:8px;padding:10px 16px;border-radius:22px;font-size:12px!important;font-weight:700;cursor:pointer}.book-preview-link{background:#4b108c;color:#fff}.book-free-link{background:#eee6f8;color:#4b1684}.book-buy-link{border:1px solid #d9cae9;color:#4b1684;background:#fff}.book-detail-actions svg{width:15px;height:15px}.book-preview{max-width:980px;margin:24px auto 0;padding:clamp(17px,3vw,28px);border:1px solid #eee8f5;border-radius:12px;background:white;box-shadow:0 4px 15px #35106f08}.book-preview h2{font-size:22px!important;color:#35106b;margin:0 0 10px}.book-preview p{font:15px/1.75 'DM Sans',sans-serif!important;color:#5d526b;margin:0}.book-preview-note{font-size:11px!important;color:#877a91;margin-top:13px!important}.book-request-note{max-width:980px;margin:12px auto 0;color:#7b7088;font-size:11px!important;line-height:1.5!important}.payment-status{margin:12px clamp(16px,4vw,48px);padding:13px 16px;border-radius:10px;background:#f1eaf9;color:#492077;font-size:13px!important}.checkout-backdrop{position:fixed;inset:0;z-index:50;display:grid;place-items:center;padding:16px;background:#1b102ccc}.checkout-modal{width:min(100%,440px);max-height:calc(100vh - 32px);overflow:auto;padding:24px;border-radius:17px;background:#fff;box-shadow:0 18px 60px #10001f55}.checkout-heading{display:flex;align-items:flex-start;justify-content:space-between;gap:12px}.checkout-heading h2{font-size:22px!important;line-height:1.2!important;color:#35106b;margin:0 0 5px}.checkout-heading p,.checkout-subtitle{font-size:12px!important;line-height:1.5!important;color:#766a82;margin:0}.checkout-close{border:0;background:transparent;color:#624879;cursor:pointer;padding:4px}.checkout-close svg{width:20px}.checkout-price{margin:17px 0;padding:13px;border-radius:10px;background:#f7f3fb;color:#4d2080;font-size:14px!important;font-weight:700}.checkout-form{display:grid;gap:12px;margin-top:18px}.checkout-form label{display:grid;gap:5px;color:#514460;font-size:12px!important;font-weight:700}.checkout-form input{width:100%;min-height:42px;padding:9px 11px;border:1px solid #ded4e8;border-radius:8px;font:14px Arial,sans-serif}.checkout-form button{min-height:44px;margin-top:4px;border:0;border-radius:24px;background:#4b108c;color:#fff;font-size:13px!important;font-weight:700;cursor:pointer}.checkout-form button:disabled{opacity:.6;cursor:wait}.checkout-message{margin:12px 0 0;color:#8a2e3c;font-size:12px!important;line-height:1.5!important}.checkout-secure{margin:11px 0 0;text-align:center;color:#82768c;font-size:10px!important}
    @media(max-width:650px){.book-detail-page{padding-bottom:26px}.book-back{padding:11px 14px;font-size:11px!important}.book-detail-hero{grid-template-columns:96px minmax(0,1fr);gap:14px;padding:15px 12px}.book-detail-hero>img{aspect-ratio:3/4;max-height:145px;border-radius:8px}.book-detail-category{font-size:9px!important;margin-bottom:4px}.book-detail-copy h1{font-size:23px!important;margin-bottom:5px}.book-detail-meta{font-size:10px!important;margin-bottom:8px}.book-detail-description{font-size:11px!important;line-height:1.5!important;display:-webkit-box;-webkit-line-clamp:4;-webkit-box-orient:vertical;overflow:hidden}.book-detail-actions{gap:6px;margin-top:11px}.book-detail-actions a,.book-detail-actions button{min-height:34px;padding:8px 10px;font-size:9px!important}.book-detail-actions svg{width:12px;height:12px}.book-preview{margin:14px 12px 0;padding:15px}.book-preview h2{font-size:18px!important}.book-preview p{font-size:13px!important}.book-preview-note{font-size:10px!important}.book-request-note{margin:10px 12px 0}.checkout-modal{padding:19px}}
  `}</style><a className="book-back" href="/library"><ArrowLeft/> Books &amp; Digital Library</a>
    {paymentStatus && <p className="payment-status" role="status">{paymentStatus}</p>}
    <section className="book-detail-hero"><img src={book.img} alt={`${book.title} cover`}/><div className="book-detail-copy"><p className="book-detail-category">{book.category.toUpperCase()}</p><h1>{book.title}</h1><p className="book-detail-meta">{book.type} · {book.year}</p><p className="book-detail-description">Explore this publication about Gedeo culture, history, livelihoods, and development. Read the sample preview below, or contact the tourism team to request a free digital copy or ask about buying a print edition.</p><div className="book-detail-actions"><a className="book-preview-link" href="#book-preview"><BookOpen/> Read preview</a><a className="book-free-link" href={requestLink('Request free digital copy')}><Download/> Free digital copy</a><button className="book-buy-link" type="button" onClick={openCheckout}><ShoppingBag/> Buy print</button></div></div></section>
    <section className="book-preview" id="book-preview"><h2>Preview</h2><p>{book.preview}</p><p className="book-preview-note">This is a sample preview. Contact the library team for publication availability and full access.</p></section><p className="book-request-note">Print checkout is processed securely by Chapa. The library team will contact you about delivery after payment confirmation.</p>
    {checkoutOpen && <div className="checkout-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget && !submitting) setCheckoutOpen(false); }}><section className="checkout-modal" role="dialog" aria-modal="true" aria-labelledby="checkout-title"><div className="checkout-heading"><div><h2 id="checkout-title">Buy print edition</h2><p>{book.title}</p></div><button className="checkout-close" type="button" aria-label="Close checkout" onClick={() => setCheckoutOpen(false)}><X/></button></div><p className="checkout-price">{priceLoading ? 'Loading price…' : price ? `Print price: ${price.toLocaleString()} ETB` : priceUnavailable ? 'Print price not set yet' : ''}</p><p className="checkout-subtitle">Enter your details, then continue to Chapa’s secure payment page.</p><form className="checkout-form" onSubmit={startCheckout}><label>First name<input autoComplete="given-name" required value={form.firstName} onChange={(event) => setForm({ ...form, firstName: event.target.value })}/></label><label>Last name<input autoComplete="family-name" required value={form.lastName} onChange={(event) => setForm({ ...form, lastName: event.target.value })}/></label><label>Email address<input type="email" autoComplete="email" required value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })}/></label><button type="submit" disabled={submitting || priceLoading || priceUnavailable || !price}>{submitting ? 'Connecting to Chapa…' : 'Continue to payment'}</button></form>{paymentMessage && <p className="checkout-message" role="status">{paymentMessage}</p>}<p className="checkout-secure">Your payment details are entered on Chapa, not stored on this site.</p></section></div>}
  </main>;
}
