import type { Item } from '../hooks/useVenderProducts';
import { create } from 'zustand';

type State = {
  quantity: number;
  item: Item | null;
};

const MINIMUM_QUANTITY = 1;

const useSelectedItemStore = create<State>()(() => ({
  quantity: MINIMUM_QUANTITY,
  item: null
}));

export const increaseQuantity = () => useSelectedItemStore.setState(state => ({
  quantity: state.quantity + 1
}));

export const decreaseQuantity = () => useSelectedItemStore.setState(state => ({
  quantity: state.quantity > MINIMUM_QUANTITY ? state.quantity - 1 : MINIMUM_QUANTITY
}));

export const setSelectedItem = (item: Item | null) => useSelectedItemStore.setState({ item });

export const resetSelectedItem = () => useSelectedItemStore.setState(state => ({
  item: null,
  quantity: 1
}));

export default useSelectedItemStore;
