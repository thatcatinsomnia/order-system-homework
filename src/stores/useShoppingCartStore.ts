import type { Item } from '../hooks/useVenderProducts';
import { persist } from 'zustand/middleware'
import { create } from 'zustand';

type State = {
  cart: OrderItem[] | [];
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
    (_set, _get) => ({
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

// find the order item then update the content
export const updateShoppingCart = (updatedOrderItem: OrderItem) => useShoppingCartStore.setState(state => {
  const updatedCart = state.cart.map(orderItem => {
    if (orderItem.id === updatedOrderItem.id) {
      return updatedOrderItem
    }

    return orderItem;
  });

  return {
    cart: updatedCart
  }
});

export const decreaseById = (id: OrderItem['id']) => useShoppingCartStore.setState(state => {
  const updatedCart = state.cart.map(item => {
    if (item.id === id && item.quantity > MINIMUM_QUANTITY) {
      item.quantity = item.quantity - 1;
    }

    return item;
  });

  return { cart: updatedCart }
});

export const increaseById = (id: OrderItem['id']) => useShoppingCartStore.setState(state => {
  const updatedCart = state.cart.map(item => {
    if (item.id === id) {
      item.quantity = item.quantity + 1;
    }

    return item;
  });

  return { cart: updatedCart }
});

export const deleteById = (id: string | null) => useShoppingCartStore.setState(state => ({
  cart: state.cart.filter(orderItem => orderItem.id !== id)
}));

export default useShoppingCartStore;
