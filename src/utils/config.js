export const API_URL = process.env.API_URL || 'http://127.0.0.1:1337';

export const formattedProductsResponse = (products) => {
  return products.map(({attributes, id}) => {

    const {title, description, slug, price} = attributes
    const {url} = attributes.thumbnail.data.attributes

    return {
      id, 
      title, 
      description, 
      slug, 
      price,
      image: url
    }
  })
}