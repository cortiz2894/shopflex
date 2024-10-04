import { Product, StrapiProduct } from '@/interfaces/products.interface';

export const formattedProductsResponse = (products: StrapiProduct[]): Product[] => {
  return products.map(({ attributes, id }) => {
    const { title, description, slug, price, discount } = attributes;
    const { url } = attributes.thumbnail.data.attributes;

    return {
      id,
      title,
      description,
      slug,
      price,
      image: url,
      discount,
    };
  });
};
