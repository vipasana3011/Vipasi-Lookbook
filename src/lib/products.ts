import productsData from '@/../data/products.json';
import { Product } from './types';

export const products: Product[] = productsData as Product[];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getAllCategories(): string[] {
  return Array.from(new Set(products.map((p) => p.categoryFamily)));
}

export function getAllOccasions(): string[] {
  return Array.from(new Set(products.flatMap((p) => p.occasions)));
}
