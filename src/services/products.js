import { API_URL } from '@/utils/config.js'

async function getProducts() {
  const res = await fetch(`${API_URL}/api/products?populate=*`)

  if(!res.ok) {
    throw new Error('Algo salio mal')
  }

  const {data} = await res.json()

  return data.map(({attributes, id}) => {

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

async function getProduct(identifier) {
  const res = await fetch(`${API_URL}/api/products/${identifier}?populate=*`)

  if(!res.ok) {
    throw new Error('Algo salio mal')
  }

  const {data} = await res.json()

  const { id, attributes } = data[0]
  const { title, description, slug, price, image} = attributes
  console.log('destructuracion: ', id, data)

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

export { getProducts, getImage, getProduct }