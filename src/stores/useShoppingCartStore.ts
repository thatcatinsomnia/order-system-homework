import type { Item } from '../hooks/useVenderProducts';
import { persist } from 'zustand/middleware'
import { create } from 'zustand';

type State = {
  cart: OrderItem[] | [];
  editItem: OrderItem | null;
};

export type OrderItem = {
  id: string;
  vender: string;
  customer: string;
  note: string;
  item: Item;
  quantity: number;
};

const MINIMUM_QUANTITY = 1;

const useShoppingCartStore = create<State>()(
  persist(
    (set, get) => ({
      cart: [],
      editItem: null
    }),
    {
      name: 'order-system'
    }
  )
);

export const addToShoppingCart = (newOrderItem: OrderItem) => useShoppingCartStore.setState(state => {
  if (state.cart.length > 0) {
    return {
      cart: [...state.cart, newOrderItem]
    }
  }

  return {
    cart: [newOrderItem]
  }
});

export const decrease = (id: OrderItem['id']) => useShoppingCartStore.setState(state => {
  const updatedCart = state.cart.map(item => {
    if (item.id === id && item.quantity > MINIMUM_QUANTITY) {
      item.quantity = item.quantity - 1;
    }

    return item;
  });

  return { cart: updatedCart }
});

export const increase = (id: OrderItem['id']) => useShoppingCartStore.setState(state => {
  const updatedCart = state.cart.map(item => {
    if (item.id === id) {
      item.quantity = item.quantity + 1;
    }

    return item;
  });

  return { cart: updatedCart }
});

export const setEditItem = (item: OrderItem) => useShoppingCartStore.setState(state => ({
  editItem: item
}));

export const clearEditItem = () => useShoppingCartStore.setState(() => {
  return {
    editItem: null
  }
});

export default useShoppingCartStore;
