# P Santhosh Electronics — E‑Commerce Site

A storefront for basic-to-intermediate electronic project kits, built to the stack you
specified:

```
[ Next.js 16 (App Router) ] ---> State management (Zustand) & Checkout
        |
        +---> [ React Three Fiber ] ---> 3D product viewer & lighting
        |         |
        |         +---> [ Drei ] ---> Bounds auto-framing, AdaptiveDpr/Events,
        |                             OrbitControls, Environment, ContactShadows
        |
        +---> [ Tailwind CSS v4 ] ---> Shopping UI, buttons, cart, checkout
```

## Why this is a downloadable project, not an in-chat preview

React Three Fiber and Drei aren't part of the sandboxed library set the in-chat code
preview supports (it only allows plain `three`, without even `OrbitControls`), so
building this as a real Next.js project — the same stack you asked for — gives you the
actual thing instead of a compromised stand-in. Run it locally to see it live.

## Getting started

Requires **Node.js 20+**.

```bash
npm install
npm run dev
```

Then open **http://localhost:3000**.

> This environment has no internet access, so `npm install` and the dev/build steps
> haven't been run or tested here. Versions were pinned to the current stable release
> line for each package as of mid-2026 (Next 16 / React 19 / R3F 9 / Drei 10 / Tailwind
> 4), but if `npm install` reports a peer-dependency conflict, that's the first thing to
> check — paste me the error and I'll fix it.

## What's implemented

- **Home page** — hero with a live rotating 3D showcase model, then a filterable grid
  (All / Basic / Intermediate) of all 13 kits.
- **Product page** (`/product/[slug]`) — full interactive 3D viewer (drag to orbit,
  auto-rotate toggle), spec sheet, "what's in the kit" bill-of-materials, skills learned,
  and an add-to-cart panel.
- **Cart** (`/cart`) — quantity editing, removal, running total, persisted to
  `localStorage` via Zustand so it survives a page refresh.
- **Checkout** (`/checkout`) — Indian shipping address form, Cash-on-Delivery flow that
  posts to a real API route (`/api/orders`) and returns an order ID.

## Honest limitations to know about

1. **The 3D models are procedural stand-ins**, not photos or scans of your actual
   builds — six reusable shapes (circuit board, robot, solar panel, handheld detector,
   weather station, security lock) built from primitive geometry and tinted per product.
   They're a placeholder for a real "3D viewer" experience. When you have photos or can
   get a kit 3D-scanned, swap in a real `.glb` model via Drei's `useGLTF` — the loader
   scaffolding in `components/ProductViewer3D.js` is already Suspense-ready for that.
2. **No payment gateway is wired up.** Checkout only supports Cash on Delivery.
   `app/api/orders/route.js` has TODOs and comments for adding Razorpay (the standard
   choice for Indian sites) once you have a merchant account and API keys.
3. **Orders aren't saved anywhere persistent** — the API route currently just logs to
   the server console and returns an order ID. Add a database or an email notification
   before relying on this for real sales (see comments in that file).
4. **Footer contact details are placeholders** (`your-email@example.com`,
   `+91 XXXXX XXXXX`) — update `components/Footer.js` with your real contact info.
5. **Location**: your general area (Ithepalli, Andhra Pradesh – 517102) is used in the
   footer and checkout copy. I deliberately left your exact GPS coordinates out of the
   public site — publishing precise coordinates on a live storefront exposes your exact
   home location to any visitor. Happy to add a proper embedded map if you'd like one.

## Editing the catalog

All product data — including price — lives in one file: `lib/products.js`. Each entry
looks like this:

```js
{
  id: 'led-chaser-circuit',        // used as the URL slug and cart key
  partNumber: 'SE-LC01',
  name: 'LED Chaser Light Circuit',
  level: 'basic',                   // 'basic' | 'intermediate'
  price: 449,                       // INR, whole rupees
  model: 'circuit-board',           // which 3D shape to render
  accent: '#D99A2B',                // tints the model + card icon
  kit: ['555 Timer IC + CD4017 counter IC', /* ... */],
  skills: ['555 timer ICs', /* ... */],
  buildTime: '45–60 min',
  // ...
}
```

Add, remove, or re-price kits by editing that array — everything else (routing, cards,
spec sheets) is generated from it automatically.

## Current catalog & pricing logic

| Level | Count | Price range | Basis |
|---|---|---|---|
| Basic | 6 | ₹399 – ₹899 | Single-board kits, minimal part count, 30–90 min builds |
| Intermediate | 7 | ₹1,499 – ₹2,799 | Microcontroller-based, motors/sensors/modules, 2–3 hr builds |

Prices are positioned against typical Indian hobbyist-kit pricing and scale roughly with
component cost and assembly time — adjust freely once you know your actual sourcing
costs and margin target.

## Design system

Colour and type choices are grounded in the subject rather than generic "tech site"
defaults — solder-mask green, copper-trace amber, and a blueprint-tinted paper
background; IBM Plex Sans/Mono for a datasheet feel; the repeating corner "crop-marks"
on cards echo PCB fabrication-panel registration marks. Tokens live in `app/globals.css`
(`@theme` block) if you want to retheme.

## Deploying

The fastest path is [Vercel](https://vercel.com) (made by the Next.js team — push this
folder to a GitHub repo, then import it in Vercel with zero config needed). Any Node
hosting that supports Next.js works too.

## Project structure

```
app/
  layout.js              — fonts, metadata, navbar/footer shell
  page.js                — home page
  product/[slug]/page.js — product detail + 3D viewer
  cart/page.js
  checkout/page.js
  api/orders/route.js    — order submission endpoint (see TODOs)
components/
  models/ProjectModels.js — the 6 procedural 3D models
  ProductViewer3D.js       — R3F Canvas, lights, Drei controls
  Navbar, Footer, Hero, ProductCard, ProductGrid, ...
lib/
  products.js — full catalog (edit this to change products/prices)
  store.js    — Zustand cart store (persisted to localStorage)
  utils.js    — currency formatting, small helpers
```
