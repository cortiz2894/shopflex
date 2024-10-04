import { API_URL, formattedProductsResponse } from '@/utils/config.js';

async function getProducts() {
  const res = await fetch(`${API_URL}/api/products?populate=*`);

  if (!res.ok) {
    throw new Error('Algo salio mal');
  }
  const { data } = await res.json();

  return formattedProductsResponse(data);
}

async function getCategory(category) {
  let url = `${API_URL}/api/categories?populate[products][populate]=*`;

  if (category) {
    url = `${API_URL}/api/categories?filters[slug][$eq]=${category}&populate[products][populate]=*`;
  }

  const res = await fetch(url);

  if (!res.ok) {
    throw new Error('Algo salio mal');
  }
  const { data } = await res.json();

  return data.map((category) => {
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

async function getDrops(drop) {
  const buildUrl = (drop) => {
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

  const formatDropData = (dropData) => {
    const { attributes, id } = dropData;
    const formattedData = {
      title: attributes.title,
      slug: attributes.slug,
      id: id,
      image: attributes.cover.data.attributes.url,
    };

    if (drop) {
      formattedData.products = formattedProductsResponse(attributes.products.data);
    }

    return formattedData;
  };

  return data.map(formatDropData);
}

async function getProduct(identifier) {
  const res = await fetch(`${API_URL}/api/products?filters[slug][$eq]=${identifier}&populate=*`);

  if (!res.ok) {
    throw new Error('Algo salio mal');
  }

  const { data } = await res.json();

  const { id, attributes } = data[0];
  const { title, description, slug, price, image, discount, drop, sizes, categories, colors } = attributes;

  const images = image.data.map((im) => {
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
    sizes: sizes.data.map((size) => size.attributes.title),
    categories: categories.data,
    colors: colors?.data.map((color) => color.attributes.title) ?? [],
  };
  return dataToReturn;
}

const getImage = (url) => {
  return `${API_URL}${url}`;
};

export { getProducts, getImage, getProduct, getCategory, getDrops };
