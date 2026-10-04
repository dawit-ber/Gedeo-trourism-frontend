import { spawn } from 'node:child_process';

const api = spawn(process.execPath, ['server/index.js', '--api-only'], {
  stdio: 'inherit',
  env: { ...process.env, API_PORT: process.env.API_PORT || '8787' },
});
const vite = spawn(process.execPath, ['node_modules/vite/bin/vite.js', '--host', '0.0.0.0'], {
  stdio: 'inherit',
  env: process.env,
});

let stopping = false;
function stop(signal = 'SIGTERM') {
  if (stopping) return;
  stopping = true;
  api.kill(signal);
  vite.kill(signal);
}
process.on('SIGINT', () => stop('SIGINT'));
process.on('SIGTERM', () => stop('SIGTERM'));
api.on('exit', (code) => {
  if (!stopping) {
    console.error(`Payment API exited (${code ?? 'signal'}).`);
    stop();
    process.exitCode = code || 1;
  }
});
vite.on('exit', (code) => {
  if (!stopping) {
    stop();
    process.exitCode = code || 0;
  }
});
