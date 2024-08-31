import { API_URL, formattedProductsResponse } from '@/utils/config.js'

async function getProducts() {
  const res = await fetch(`${API_URL}/api/products?populate=*`)

  if(!res.ok) {
    throw new Error('Algo salio mal')
  }
  const {data} = await res.json()

  return formattedProductsResponse(data)
}

async function getCategory(category) {
  
  // const res = await fetch(`${API_URL}/api/categories?filters[slug][$eq]=${category}&populate[products][populate]=*`)
  const res = await fetch(`${API_URL}/api/categories?populate[products][populate]=*`)

  if(!res.ok) {
    throw new Error('Algo salio mal')
  }
  const { data } = await res.json()

  return data.map((category) => {
    const { attributes, id} = category

    const productsByCategory = formattedProductsResponse(attributes.products.data)
  
    return {
      title: attributes.title,
      slug: attributes.slug,
      id: id,
      products: productsByCategory
    }
  })
}


async function getProduct(identifier) {
  const res = await fetch(`${API_URL}/api/products/${identifier}?populate=*`)

  if(!res.ok) {
    throw new Error('Algo salio mal')
  }

  const {data} = await res.json()

  const { id, attributes } = data[0]
  const { title, description, slug, price, image} = attributes

  const images = image.data.map((im) => {
    return im.attributes.url
  })

  const dataToReturn = {
    id,
    title,
    description,
    slug,
    price,
    images
  }

  return dataToReturn
}

const getImage = (url) => {
  return `${API_URL}${url}`
}

export { getProducts, getImage, getProduct, getCategory }