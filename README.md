# Gedeo Culture & Tourism

A responsive tourism website featuring Gedeo destinations, culture and heritage, events, travel guidance, articles, and a digital library.

## Run locally

```sh
npm install
npm run dev
```

## Build

```sh
npm run build
```

Printed book checkout uses the Chapa integration. Configure server-side values in `.env` using `.env.example` as a template. Keep `CHAPA_SECRET_KEY` on the server and never expose it through a `VITE_` variable. See [PAYMENTS.md](PAYMENTS.md) for setup details.
