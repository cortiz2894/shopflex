import { Product, StrapiProduct } from './products.interface';

export interface Category {
  id: number;
  title: string;
  slug: string;
  products: Product[];
}

// PD: chris, en products lo hice distinto, creo que lo bueno de hacer dos interfaces distintidas es que se podemos cambiar el strapi
// y no afecta a la interfaz de la app, pero en este caso no se si es necesario, que opinas? es mas codigo, la otra es mas unificada
// pero si cambia strapi afecta a la app, en base a eso dejamos todas iguales asi no es un bardo
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
