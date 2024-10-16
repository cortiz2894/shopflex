import { API_URL } from '@/utils/config';
import { formattedProductsResponse } from '@/utils/transformers/products.transformer';

import { Category, StrapiCategory } from '@/interfaces/categories.interface';
import { Drops, StrapiDrop } from '@/interfaces/drops.interface';
import { Product, ProductDetail, StrapiProduct } from '@/interfaces/products.interface';

// TODO: implement try/catch and error handler for better error handler
async function getProducts(): Promise<Product[]> {
  const res = await fetch(`${API_URL}/api/products?populate=*`);

  if (!res.ok) {
    throw new Error('Algo salio mal');
  }
  const { data } = await res.json();
  return formattedProductsResponse(data as StrapiProduct[]);
}

async function getCategory(category?: string): Promise<Category[]> {
  let url = `${API_URL}/api/categories?populate[products][populate]=*`;

  if (category) {
    url = `${API_URL}/api/categories?filters[slug][$eq]=${category}&populate[products][populate]=*`;
  }

  const res = await fetch(url);

  if (!res.ok) {
    throw new Error('Algo salio mal');
  }

  const { data } = await res.json();

  return data.map((category: StrapiCategory) => {
    const { attributes, id } = category;

    const productsByCategory = formattedProductsResponse(attributes.products.data);

    return {
      title: attributes.title,
      slug: attributes.slug,
      id: id,
      products: productsByCategory,
    };
  });
}

async function getDrops(drop?: string): Promise<Drops[]> {
  let url = `${API_URL}/api/drops?populate[cover][populate]=*`;

  if (drop) {
    url = `${API_URL}/api/drops?filters[slug][$eq]=${drop}&populate[products][populate]=*&populate=cover`;
  }

  const res = await fetch(url);

  if (!res.ok) {
    throw new Error('Algo salió mal');
  }

  const { data } = await res.json();

  const formatDropData = (dropData: StrapiDrop) => {
    const { attributes, id } = dropData;
    const formattedData: Drops = {
      title: attributes.title,
      slug: attributes.slug,
      id: id,
      image: attributes.cover.data.attributes.url,
      products: [],
    };

    if (drop) {
      formattedData.products = formattedProductsResponse(attributes.products.data);
    }

    return formattedData;
  };

  return data.map(formatDropData);
}

async function getProduct(identifier: string): Promise<ProductDetail> {
  const res = await fetch(`${API_URL}/api/products?filters[slug][$eq]=${identifier}&populate=*`);

  if (!res.ok) {
    throw new Error('Algo salio mal');
  }

  const { data } = await res.json();

  const { id, attributes } = data[0];
  const { title, description, slug, price, image, discount, drop, sizes, categories, colors } = attributes;

  const images = image.data.map((im: { attributes: { url: string } }) => {
    return im.attributes.url;
  });

  const dataToReturn = {
    id,
    title,
    description,
    slug,
    price,
    images,
    thumbnail: attributes.thumbnail.data.attributes.url,
    discount,
    drop: {
      title: drop.data.attributes.title,
      slug: drop.data.attributes.slug,
    },
    sizes: sizes.data.map((size: any) => size.attributes.title),
    categories: categories.data,
    colors: colors?.data.map((color: any) => color.attributes.title) ?? [],
    // TYPE FIXING
    image: '',
  };

  return dataToReturn;
}

const getImage = (url: string): string => {
  return `${API_URL}${url}`;
};

export { getProducts, getImage, getProduct, getCategory, getDrops };
