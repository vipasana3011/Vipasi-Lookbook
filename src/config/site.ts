/**
 * Site configuration and brand constants for THE VIPASI LOOKBOOK.
 * Any top-level editorial text can be updated directly here.
 */

export const SITE_CONFIG = {
  title: "THE VIPASI LOOKBOOK",
  subtitle: "Handcrafted in Jaipur.",
  brandName: "VIPASI",
  tagline: "Handcrafted Indian ethnic wear, made by master karigars.",
  closingHeading: "Found a design you love?",
  closingSubheading: "Message the VIPASI team.",
  websiteUrl: "https://vipasi.in",
  instagramUrl: "https://www.instagram.com/vipasi_",
  instagramHandle: "@VIPASI_",
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "919799444663",
  
  /**
   * Product name customization:
   * "Madhuwala" is the spelling in the current CSV export, but can be updated here (e.g. to "Madhubala").
   */
  MADHUWALA_PRODUCT_NAME: "Madhuwala Marigold Chanderi Anarkali Set",

  /**
   * Hero Cover Image selection:
   * A stunning, high-resolution original photograph from /public/photos
   */
  heroCoverPhoto: "/photos/DSC08488 copy.jpg",
  heroCoverAlt: "VIPASI Occasion Wear - Editorial Cover",
} as const;

/**
 * Verified live products on https://vipasi.in
 * If a product title does not match one of these verified entries, its productUrl is null.
 */
export const VERIFIED_LIVE_PRODUCTS: Record<string, string> = {
  "Aayat Onion Pink Chanderi Anarkali Set": "https://vipasi.in/products/aayat-onion-pink-chanderi-anarkali-set",
  "Suraj Mukhi Lemon Organza Silk Saree": "https://vipasi.in/products/suraj-mukhi-lemon-organza-silk-saree",
  "Chandni Ivory Chanderi Sharara Set": "https://vipasi.in/products/chandni-ivory-chanderi-sharara-set",
  "Laal Ishq Blood Red Georgette Kurta Set": "https://vipasi.in/products/laal-ishq-blood-red-georgette-kurta-set",
  "Sufiyana Blush Peach Maslin Anarkali Set": "https://vipasi.in/products/sufiyana-blush-peach-maslin-anarkali-set",
  "Madhuwala Marigold Chanderi Anarkali Set": "https://vipasi.in/products/madhubala-marigold-chanderi-anarkali-set",
  "Madhubala Marigold Chanderi Anarkali Set": "https://vipasi.in/products/madhubala-marigold-chanderi-anarkali-set",
};
