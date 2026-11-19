# THE VIPASI LOOKBOOK

An editorial, view-only lookbook web application for **VIPASI** (Jaipur, India — [vipasi.in](https://vipasi.in)), showcasing 22 signature occasion-wear garments across royal silhouettes, heritage textiles, and master karigar craftsmanship.

Built with **Next.js 15 (App Router)**, **TypeScript**, **Tailwind CSS**, and **Framer Motion / Motion 12**.

---

## Key Features & Art Direction

- **Pure View-Only Luxury Showcase**: Strictly no customisation tools, no recolouring, no colour swatches, no shade pickers, and no ecommerce friction (no prices or add-to-cart). Every photograph is presented unedited, exactly as captured on set.
- **Editorial Fashion-Magazine Layouts**: Cycles across 5 distinct asymmetric layouts (`LayoutVariant 1..5`) so no two consecutive garments share the same visual rhythm.
- **Brand Palette & Typography**: Warm ivory/parchment background (`#FAF7F2`), deep VIPASI maroon (`#5E1224`), champagne gold accents (`#C9A96E`), and crisp ink typography. Set in `Cormorant Garamond` (editorial display) and `Jost` (contemporary sans).
- **Fullscreen Editorial Lightbox**: Tap any photograph to inspect high-resolution details with keyboard arrow navigation (`←`, `→`, `Escape`), touch swipe on mobile, and 2x zoom toggle.
- **WhatsApp Concierge Link**: Direct enquiry button (`https://wa.me/{NEXT_PUBLIC_WHATSAPP_NUMBER}`) pre-filled with the exact product name.
- **Verified vipasi.in Links**: Quiet links to the live online shop exclusively for verified live handles.
- **Print / PDF Portfolio Mode**: Dedicated `@media print` stylesheet with automatic page breaks and stripped chrome for generating clean PDF lookbooks directly from browser print (`Ctrl + P` / `Cmd + P`).
- **Privacy & Performance**: Pre-rendered static pages with `noindex, nofollow` headers to prevent search indexing.

---

## Project Structure

```
VIPASI_LOOKBOOK/
├── data/
│   ├── vipasi_product_list.csv    # Original Shopify export (22 products, 110 photo rows)
│   └── products.json              # Generated typed JSON dataset
├── public/
│   ├── logo.png                   # Official VIPASI brand logo
│   └── photos/                    # Original photographs (spaces preserved)
├── scripts/
│   ├── build-products.mjs         # CSV parser and data compiler
│   └── capture.mjs                # Headless browser visual regression test script
├── src/
│   ├── app/
│   │   ├── globals.css            # Custom theme, scrollbars, print stylesheet
│   │   ├── layout.tsx             # Root layout with fonts, metadata & noindex
│   │   └── page.tsx               # Primary editorial lookbook view
│   ├── components/
│   │   └── editorial/
│   │       ├── HeroCover.tsx      # Full-bleed cover hero with logo & subtitle
│   │       ├── BrandIntro.tsx     # Verbatim brand tagline quote
│   │       ├── StickyFilterBar.tsx# Sticky category & occasion filter index
│   │       ├── ProductSection.tsx # Layout variant orchestrator
│   │       ├── ProductInfo.tsx    # Typography-first details & WhatsApp CTA
│   │       ├── Lightbox.tsx       # Fullscreen touch & keyboard modal
│   │       ├── ClosingSection.tsx # Official closing brand sign-off
│   │       └── layouts/           # 5 distinct editorial layout variants
│   ├── config/
│   │   └── site.ts                # Site title, subtitle, WhatsApp & naming config
│   └── lib/
│       ├── products.ts            # Typed product data accessor
│       └── types.ts               # TypeScript data definitions
├── .env.example
├── .env.local
└── tailwind.config.ts
```

---

## Getting Started

### 1. Install Dependencies
```bash
pnpm install
```

### 2. Build the Product Data
```bash
pnpm run data:build
```
This reads `data/vipasi_product_list.csv`, maps all 22 products and their 5 associated photos, checks `Image Alt Text` for precise view classification, and outputs `data/products.json`.

### 3. Start Development Server
```bash
pnpm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Production Build
```bash
pnpm run build
pnpm run start
```

---

## Editorial Customisation Guide

### Updating Site Title, Subtitle, or WhatsApp Number
All top-level copy is centralized in `src/config/site.ts`:

```typescript
export const SITE_CONFIG = {
  title: "THE VIPASI LOOKBOOK",
  subtitle: "Handcrafted in Jaipur.",
  tagline: "Handcrafted Indian ethnic wear, made by master karigars.",
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "919799444663",
  
  // Update "Madhuwala" spelling here if desired:
  MADHUWALA_PRODUCT_NAME: "Madhuwala Marigold Chanderi Anarkali Set",
  ...
};
```

You can also set `NEXT_PUBLIC_WHATSAPP_NUMBER` in `.env.local` to override the phone number without modifying code.

### Adding New Photos or Updating the CSV
1. Place new high-resolution JPEG images in `public/photos/`.
2. Update `data/vipasi_product_list.csv` with the corresponding rows and filenames.
3. Re-run:
   ```bash
   pnpm run data:build
   ```
4. Build the project:
   ```bash
   pnpm run build
   ```

---

## Deployment to Vercel

1. Push your repository to GitHub:
   ```bash
   git init
   git add .
   git commit -m "feat: complete editorial VIPASI lookbook"
   git branch -M main
   git remote add origin https://github.com/<your-username>/vipasi-lookbook.git
   git push -u origin main
   ```
2. Log in to [Vercel](https://vercel.com) and click **"Add New Project"**.
3. Import the `vipasi-lookbook` repository.
4. Set the build command to `pnpm run build` (which automatically runs `prebuild: node scripts/build-products.mjs`).
5. (Optional) In **Environment Variables**, add:
   - `NEXT_PUBLIC_WHATSAPP_NUMBER`: `919799444663`
6. Click **Deploy**. Vercel will build and assign your production URL.
