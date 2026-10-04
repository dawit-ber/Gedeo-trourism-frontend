# Chapa print checkout

The book detail pages use a server-side Chapa integration. The browser never receives the Chapa secret key.

1. Copy `.env.example` to `.env` for local setup, or configure the same variables in the production server environment.
2. Set `CHAPA_SECRET_KEY` to the merchant secret from Chapa and `APP_URL` to the public site origin (for example, `https://example.com`).
3. Set an ETB price for each publication you want to sell, using the matching `PRINT_PRICE_<BOOK_SLUG>_ETB` variable shown in `.env.example`. Leave a price blank to keep checkout unavailable for that book.
4. Run `npm run dev` locally. For production, run `npm run build` and start the Node server with `npm start`; it serves `dist` and the payment API on the same origin. Set `PORT` if the hosting platform provides a port.

After Chapa redirects back, the site verifies the transaction with Chapa and checks the paid amount and currency before showing confirmation. Pending order references are held in server memory, so run one persistent server process; a database-backed order store is needed before using multiple instances or ephemeral serverless functions. Payment confirmation does not automatically arrange shipping; the library team contacts the buyer using the checkout email.
