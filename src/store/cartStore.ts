import { Product as ProductBase } from '@/components/ProductCard/product.types';
import create from 'zustand';

export interface Product extends ProductBase {
  quantity: number;
}

export interface CartStore {
  products: Product[];
  addToCart: (product: ProductBase) => void;
  updateProductQuantity: (productId: number, add: boolean) => void;
  totalQuantity: number;
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

const calculateTotal = (products: Product[]): number => {
    return products.reduce((total, product) => total + product.quantity, 0);
};


export const useCartStore = create<CartStore>((set) => ({
  products: [],
  addToCart: (product: ProductBase) => set((state: CartStore) => {
    const updatedProducts = addProductToCart(state.products, product);
    return {
      products: updatedProducts,
      totalQuantity: calculateTotal(updatedProducts),
    };
  }),
  updateQuantity: (productId: number, add: boolean) => set((state: CartStore) => {
    const updatedProducts = updateProductQuantity(state.products, productId, add);
    return {
      products: updatedProducts,
      totalQuantity: calculateTotal(updatedProducts),
    };
  }),
  totalQuantity: 0,
}));
