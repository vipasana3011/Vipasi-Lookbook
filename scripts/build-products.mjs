import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const CSV_FILE = path.join(rootDir, 'data', 'vipasi_product_list.csv');
const OUTPUT_FILE = path.join(rootDir, 'data', 'products.json');

// Single source of truth for Madhuwala / Madhubala product naming
export const MADHUWALA_PRODUCT_KEY = 'Madhuwala Marigold Chanderi Anarkali Set';

// Verified live products on https://vipasi.in (base https://vipasi.in, otherwise null)
const VERIFIED_LIVE_PRODUCTS = {
  'Aayat Onion Pink Chanderi Anarkali Set': 'https://vipasi.in/products/aayat-onion-pink-chanderi-anarkali-set',
  'Suraj Mukhi Lemon Organza Silk Saree': 'https://vipasi.in/products/suraj-mukhi-lemon-organza-silk-saree',
  'Chandni Ivory Chanderi Sharara Set': 'https://vipasi.in/products/chandni-ivory-chanderi-sharara-set',
  'Laal Ishq Blood Red Georgette Kurta Set': 'https://vipasi.in/products/laal-ishq-blood-red-georgette-kurta-set',
  'Sufiyana Blush Peach Maslin Anarkali Set': 'https://vipasi.in/products/sufiyana-blush-peach-maslin-anarkali-set',
  'Madhuwala Marigold Chanderi Anarkali Set': 'https://vipasi.in/products/madhubala-marigold-chanderi-anarkali-set',
  'Madhubala Marigold Chanderi Anarkali Set': 'https://vipasi.in/products/madhubala-marigold-chanderi-anarkali-set',
};

// Allowed occasion chips strictly found in CSV tags
const ALLOWED_OCCASIONS = ['Mehendi', 'Sangeet', 'Wedding', 'Haldi', 'Festive'];

function parseCSV(text) {
  const rows = [];
  let row = [];
  let current = '';
  let inQuotes = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (c === '"') {
      if (inQuotes && text[i + 1] === '"') {
        current += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (c === ',' && !inQuotes) {
      row.push(current);
      current = '';
    } else if ((c === '\r' || c === '\n') && !inQuotes) {
      if (c === '\r' && text[i + 1] === '\n') { i++; }
      row.push(current);
      current = '';
      if (row.length > 1 || (row.length === 1 && row[0] !== '')) rows.push(row);
      row = [];
    } else {
      current += c;
    }
  }
  if (current || row.length > 0) { row.push(current); rows.push(row); }
  return rows;
}

function stripHtml(html) {
  if (!html) return '';
  return html
    .replace(/<[^>]+>/g, '')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .trim();
}

function extractDescription(bodyHtml) {
  if (!bodyHtml) return '';
  const pMatch = bodyHtml.match(/<p>([\s\S]*?)<\/p>/i);
  return pMatch ? stripHtml(pMatch[1]) : '';
}

function extractDetails(bodyHtml) {
  if (!bodyHtml) return [];
  const liMatches = [...bodyHtml.matchAll(/<li>([\s\S]*?)<\/li>/gi)];
  return liMatches
    .map(m => stripHtml(m[1]))
    .filter(item => item.length > 0 && !item.toLowerCase().startsWith('set includes'));
}

function generateSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

function getCategoryFamily(type) {
  const t = (type || '').toLowerCase();
  if (t.includes('anarkali') || t.includes('gown')) return 'Anarkali';
  if (t.includes('sharara') || t.includes('palazzo')) return 'Sharara and Palazzo';
  if (t.includes('saree')) return 'Saree';
  if (t.includes('lehenga')) return 'Lehenga';
  if (t.includes('kurta') || t.includes('co-ord')) return 'Kurta and Co-ord';
  return 'Occasion Wear';
}

function extractOccasions(tagsString) {
  if (!tagsString) return [];
  const result = [];
  for (const occ of ALLOWED_OCCASIONS) {
    const regex = new RegExp(`\\b${occ}\\b`, 'i');
    if (regex.test(tagsString)) {
      result.push(occ);
    }
  }
  return result;
}

function classifyPhoto(altText, position, fallbackRole) {
  const alt = (altText || '').toLowerCase();
  
  if (
    alt.includes('back view') ||
    alt.includes('from behind') ||
    alt.includes('at the nape') ||
    alt.includes('back neckline') ||
    alt.includes('back of the') ||
    alt.includes('back showing')
  ) {
    return 'back';
  }
  
  if (
    alt.includes('close up') ||
    alt.includes('close-up') ||
    alt.includes('close view') ||
    alt.includes('detail') ||
    alt.includes('neckline') ||
    alt.includes('bodice') ||
    alt.includes('cuff') ||
    alt.includes('yoke embroidery') ||
    alt.includes('border') ||
    alt.includes('waistband') ||
    alt.includes('tassels') ||
    alt.includes('motif')
  ) {
    return 'detail';
  }
  
  if (
    alt.includes('side view') ||
    alt.includes('three quarter') ||
    alt.includes('three-quarter') ||
    alt.includes('angled view') ||
    alt.includes('turned slightly')
  ) {
    return 'side';
  }
  
  if (
    alt.includes('front view') ||
    alt.includes('full length front') ||
    alt.includes('full-length front') ||
    alt.includes('front')
  ) {
    return 'front';
  }

  return fallbackRole || 'overall';
}

function buildProducts() {
  console.log(`[build-products] Reading CSV from ${CSV_FILE}`);
  if (!fs.existsSync(CSV_FILE)) {
    throw new Error(`CSV file not found at ${CSV_FILE}`);
  }

  const csvContent = fs.readFileSync(CSV_FILE, 'utf8');
  const rows = parseCSV(csvContent);
  const headers = rows[0];

  const getIdx = (name) => headers.indexOf(name);
  const handleIdx = getIdx('Handle');
  const titleIdx = getIdx('Title');
  const typeIdx = getIdx('Type');
  const tagsIdx = getIdx('Tags');
  const bodyIdx = getIdx('Body (HTML)');
  const colorIdx = getIdx('Color (product.metafields.shopify.color)');
  const fabricIdx = getIdx('Fabric (product.metafields.shopify.fabric)');
  const workIdx = getIdx('Work (product.metafields.custom.work)');
  const setContentsIdx = getIdx('Set contents (product.metafields.custom.set_contents)');
  const silhouetteIdx = getIdx('Silhouette (product.metafields.custom.silhouette)');

  const sourcePhotoIdx = getIdx('Source Photo');
  const roleIdx = getIdx('Image Role');
  const posIdx = getIdx('Image Position');
  const altIdx = getIdx('Image Alt Text');

  const groups = new Map();
  for (let i = 1; i < rows.length; i++) {
    const row = rows[i];
    const handle = row[handleIdx];
    if (!handle) continue;
    if (!groups.has(handle)) groups.set(handle, []);
    groups.get(handle).push(row);
  }

  const products = [];
  let productIndex = 0;

  for (const [csvHandle, pRows] of groups) {
    const primaryRow = pRows[0];
    const rawTitle = primaryRow[titleIdx];
    if (!rawTitle) continue;

    productIndex++;
    const title = rawTitle.trim();
    const slug = generateSlug(title);
    const category = (primaryRow[typeIdx] || '').trim();
    const categoryFamily = getCategoryFamily(category);
    const tagsRaw = primaryRow[tagsIdx] || '';
    const occasions = extractOccasions(tagsRaw);
    const bodyHtml = primaryRow[bodyIdx] || '';
    const description = extractDescription(bodyHtml);
    const details = extractDetails(bodyHtml);

    // Exact specification metafields preserved verbatim
    const color = (primaryRow[colorIdx] || '').trim();
    const fabric = (primaryRow[fabricIdx] || '').trim();
    const work = (primaryRow[workIdx] || '').trim();
    const setContents = (primaryRow[setContentsIdx] || '').trim();
    const silhouette = (primaryRow[silhouetteIdx] || '').trim();

    // Verified live product URL
    const productUrl = VERIFIED_LIVE_PRODUCTS[title] || null;

    // Editorial layout variant: rotate 1 to 5 so no two consecutive garments look alike
    const layoutVariant = ((productIndex - 1) % 5) + 1;

    // Photos
    const photos = pRows
      .map((r) => {
        const sourcePhoto = (r[sourcePhotoIdx] || '').trim();
        if (!sourcePhoto) return null;

        const position = Number(r[posIdx]) || 1;
        const altText = (r[altIdx] || '').trim();
        const rawRole = (r[roleIdx] || '').trim();
        const view = classifyPhoto(altText, position, rawRole);

        // Web-safe URL-encoded photo path helper
        const urlEncodedPath = `/photos/${encodeURIComponent(sourcePhoto)}`;

        return {
          filename: sourcePhoto,
          src: urlEncodedPath,
          position,
          isPrimary: position === 1,
          view,
          alt: altText || `${title} - VIPASI Lookbook View`,
        };
      })
      .filter(Boolean)
      .sort((a, b) => a.position - b.position);

    products.push({
      id: `vipasi-${productIndex.toString().padStart(2, '0')}`,
      index: productIndex,
      issueNumber: `N° ${productIndex.toString().padStart(2, '0')}`,
      title,
      slug,
      category,
      categoryFamily,
      occasions,
      description,
      details,
      color,
      fabric,
      work,
      setContents,
      silhouette,
      productUrl,
      layoutVariant,
      photos,
      primaryPhoto: photos[0] || null,
    });
  }

  // Ensure output dir exists
  fs.mkdirSync(path.dirname(OUTPUT_FILE), { recursive: true });
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(products, null, 2), 'utf8');

  console.log(`[build-products] Successfully generated ${products.length} products to ${OUTPUT_FILE}`);
}

buildProducts();
