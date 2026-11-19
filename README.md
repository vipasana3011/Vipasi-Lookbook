# THE VIPASI LOOKBOOK

A minimal, elegant, view-only digital fashion catalogue for **VIPASI** (Jaipur, India — [vipasi.in](https://vipasi.in)), showcasing 22 signature occasion-wear garments across royal silhouettes, heritage textiles, and master karigar craftsmanship.

Built with **Next.js 15 (App Router)**, **TypeScript**, and **Tailwind CSS**.

---

## Art Direction & Design

- **One Single Page Only**: No complex navigation, no multi-level filter bars, no search bars, no shopping carts, no login accounts, and no popups.
- **Photography is the Hero**: Outfit photography occupies 85–90% of the visual experience. Visitors simply open the page and scroll through the garments.
- **Brand Palette & Typography**: Warm ivory/parchment background (`#FAF7F2`), deep VIPASI maroon (`#5E1224`), champagne gold accents (`#C9A96E`), and crisp ink typography. Set in `Cormorant Garamond` and `Jost`.
- **Consistent Editorial Grid**: Each outfit features a dominant primary full-length portrait followed by clean supporting angles (side view, back view, craftsmanship close-up).
- **Lightweight & Fast**: Outfit photographs optimized to crisp 1600px height at 82% quality (under 29 MB total repository size).
- **Direct WhatsApp Concierge**: A quiet text link on each outfit to enquire on WhatsApp (`https://wa.me/{NEXT_PUBLIC_WHATSAPP_NUMBER}`) pre-filled with the exact garment name.

---

## Page Structure

1. **Minimal VIPASI Header**: Centered logo with quiet "LOOKBOOK • JAIPUR" subtitle.
2. **Outfit Photography Section**: Sequential catalogue flow of all 22 signature garments.
3. **Simple Footer**: VIPASI branding, verbatim tagline (*"Handcrafted Indian ethnic wear, made by master karigars."*), official website, and Instagram links.

---

## Quick Start

### 1. Run Development Server
```bash
pnpm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 2. Build for Production
```bash
pnpm run build
pnpm run start
```

### 3. Push to GitHub
```bash
git push -u origin main --force
```

---

## Deployment to Vercel

1. Push your repository to GitHub using `git push -u origin main --force`.
2. Go to **[vercel.com/new](https://vercel.com/new)** and import `Vipasi-Lookbook`.
3. Framework Preset: **Next.js** (auto-detected).
4. Click **Deploy**. Vercel will deploy your lookbook in under a minute.
