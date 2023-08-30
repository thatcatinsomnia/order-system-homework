import type { Item } from '../hooks/useVenderProducts';
import { create } from 'zustand';

type State = {
  cart: Product[] | [];
}

type Product = {
  customer: string;
  note: string;
  item: Item;
  quantity: number;
};

const useShoppingCartStore = create<State>()(() => ({
  cart: []
}));

export const addToShoppingCart = (newProduct: Product) => useShoppingCartStore.setState((state) => ({
  cart: [...state.cart, newProduct]
}))

export default useShoppingCartStore;
