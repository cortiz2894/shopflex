import { Product as ProductBase } from '@/components/ProductCard/product.types';
import { create } from 'zustand';

export interface Product extends ProductBase {
  quantity: number;
}

export interface Totals {
  price: number,
  quantity: number
}

export interface CartStore {
  products: Product[];
  addToCart: (product: ProductBase) => void;
  updateQuantity: (productId: number, add: boolean) => void;
  remove: (productId:number) => void
  totals: Totals;
}

const addProductToCart = (products: Product[], product: ProductBase): Product[] => {
  const existingProduct = products.find(p => p.id === product.id);

  if (existingProduct) {
    return products.map(p =>
      p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p
    );
  } else {
    return [
      ...products,
      { ...product, quantity: 1 },
    ];
  }
};

const updateProductQuantity = (
  products: Product[],
  productId: number,
  increment: boolean
): Product[] => {
  return products.map((p: Product) => {
    if (p.id === productId) {
      const newQuantity = increment ? p.quantity + 1 : p.quantity - 1;
      return { ...p, quantity: Math.max(newQuantity, 1) };
    }
    return p;
  });
};
const removeProduct = (
  products: Product[],
  productId: number,
): Product[] => {
  return products.filter((p) => p.id !== productId);
}

const calculateTotals = (products: Product[]): Totals => {
    const totalPrice = products.reduce((total, product) => total + (product.quantity * product.price) , 0)
    const totalQuantity = products.reduce((total, product) => total + product.quantity, 0);

    return {
      price: Math.round(totalPrice),
      quantity: totalQuantity
    }
};


export const useCartStore = create<CartStore>((set) => ({
  products: [],
  totals: {
    price: 0,
    quantity: 0
  },
  addToCart: (product: ProductBase) => set((state: CartStore) => {
    const updatedProducts = addProductToCart(state.products, product);
    return {
      products: updatedProducts,
      totals: calculateTotals(updatedProducts),
    };
  }),
  updateQuantity: (productId: number, add: boolean) => set((state: CartStore) => {
    const updatedProducts = updateProductQuantity(state.products, productId, add);
    return {
      products: updatedProducts,
      totals: calculateTotals(updatedProducts),
    };
  }),
  remove: (productId: number) => set((state: CartStore) => {
    const updatedProducts = removeProduct(state.products, productId);
    return {
      products: updatedProducts,
      totals: calculateTotals(updatedProducts),
    };
  })
}));
