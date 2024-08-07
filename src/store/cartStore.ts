import { Product } from '@/components/ProductCard/product.types'
import create from 'zustand'

export interface CartStore {
    products: Product[],
    addToCart: (product: Product) => void
}

export const useCartStore = create<CartStore>((set) => ({
    products: [],
    addToCart: (product:Product) => set((state:CartStore) => ({
        products: [
            ...state.products,
            product
        ]
    }))
}))