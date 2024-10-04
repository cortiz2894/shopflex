import { Drop } from './drops.interface';

export type Product = {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string;
  slug: string;
  discount: number;
};

export interface ProductStore extends Product {
  quantity: number;
  size: string;
  color: string;
}

export interface ProductDetail extends Product {
  drop: Drop;
  images: string[];
  colors: string[];
  sizes: string[];
  stock?: number;
  collection?: string;
  thumbnail: string;
}

export interface ProductAttributes extends Product {
  thumbnail: {
    data: {
      attributes: {
        url: string;
      };
    };
  };
}

export interface StrapiProduct {
  id: number;
  attributes: ProductAttributes;
}
