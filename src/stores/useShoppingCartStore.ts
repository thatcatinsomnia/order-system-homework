import type { Item } from '../hooks/useVenderProducts';
import { persist } from 'zustand/middleware'
import { create } from 'zustand';

type State = {
  cart: OrderItem[] | [];
};

export type OrderItem = {
  id: string;
  venderName: string;
  customer: string;
  note: string;
  item: Item;
  quantity: number;
};

const MINIMUM_QUANTITY = 1;

const useShoppingCartStore = create<State>()(
  persist(
    (set, get) => ({
      cart: []
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

// export const increase = (index: number) => useShoppingCartStore.setState(state => {
//   const updatedItems = state.items.map(item => item.)

// })

export default useShoppingCartStore;
