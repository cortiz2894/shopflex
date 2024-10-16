import { Product, StrapiProduct } from './products.interface';

export interface Category {
  id: number;
  title: string;
  slug: string;
  products: Product[];
}

export interface CategoryAttributes {
  id: number;
  title: string;
  slug: string;
  products: {
    data: StrapiProduct[];
  };
}

export interface StrapiCategory {
  id: number;
  attributes: CategoryAttributes;
}
