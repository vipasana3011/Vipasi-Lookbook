export interface ProductPhoto {
  filename: string;
  src: string;
  position: number;
  isPrimary: boolean;
  view: 'front' | 'side' | 'back' | 'detail' | 'overall';
  alt: string;
}

export interface Product {
  id: string;
  index: number;
  issueNumber: string;
  title: string;
  slug: string;
  category: string;
  categoryFamily: 'Anarkali' | 'Sharara and Palazzo' | 'Saree' | 'Lehenga' | 'Kurta and Co-ord' | string;
  occasions: string[];
  description: string;
  details: string[];
  color: string;
  fabric: string;
  work: string;
  setContents: string;
  silhouette: string;
  productUrl: string | null;
  layoutVariant: number;
  photos: ProductPhoto[];
  primaryPhoto: ProductPhoto | null;
}

export type CategoryFamily = 'All' | 'Anarkali' | 'Sharara and Palazzo' | 'Saree' | 'Lehenga' | 'Kurta and Co-ord';
