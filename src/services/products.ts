import { API_URL, formattedProductsResponse } from '@/utils/config.js';

async function getProducts() {
  const res = await fetch(`${API_URL}/api/products?populate=*`);

  if (!res.ok) {
    throw new Error('Algo salio mal');
  }
  const { data } = await res.json();

  return formattedProductsResponse(data);
}

async function getCategory(category?: any) {
  let url = `${API_URL}/api/categories?populate[products][populate]=*`;

  if (category) {
    url = `${API_URL}/api/categories?filters[slug][$eq]=${category}&populate[products][populate]=*`;
  }

  const res = await fetch(url);

  if (!res.ok) {
    throw new Error('Algo salio mal');
  }
  const { data } = await res.json();

  return data.map((category: any) => {
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

async function getDrops(drop?: string): Promise<any> {
  const buildUrl = (drop?: string): string => {
    if (drop) {
      return `${API_URL}/api/drops?filters[slug][$eq]=${drop}&populate[products][populate]=*&populate=cover`;
    }
    return `${API_URL}/api/drops?populate[cover][populate]=*`;
  };

  const url = buildUrl(drop);

  const res = await fetch(url);

  if (!res.ok) {
    throw new Error('Algo salió mal');
  }

  const { data } = await res.json();

  const formatDropData = (dropData: any) => {
    const { attributes, id } = dropData;
    const formattedData = {
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

async function getProduct(identifier: any) {
  const res = await fetch(`${API_URL}/api/products?filters[slug][$eq]=${identifier}&populate=*`);

  if (!res.ok) {
    throw new Error('Algo salio mal');
  }

  const { data } = await res.json();

  const { id, attributes } = data[0];
  const { title, description, slug, price, image, discount, drop, sizes, categories, colors } = attributes;

  const images = image.data.map((im: any) => {
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
  };
  return dataToReturn;
}

const getImage = (url: string): string => {
  return `${API_URL}${url}`;
};

export { getProducts, getImage, getProduct, getCategory, getDrops };
