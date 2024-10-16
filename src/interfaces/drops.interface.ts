import { Product, StrapiProduct } from './products.interface';

export interface Drop {
  title: string;
  slug: string;
}

export interface Drops extends Drop {
  id: number;
  image: string;
  products: Product[];
}

export interface DropAttributes extends Drop {
  id: number;
  title: string;
  slug: string;
  cover: {
    data: {
      attributes: {
        url: string;
      };
    };
  };
  products: {
    data: StrapiProduct[];
  };
}

export interface StrapiDrop {
  id: number;
  attributes: DropAttributes;
}
