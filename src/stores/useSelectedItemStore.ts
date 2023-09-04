import type { Item } from '../hooks/useVenderProducts';
import { create } from 'zustand';

export type SelectedItem = {
  id: string;
  vender: string;
  customer: string;
  note: string;
  item: Item | null;
  quantity: number;
};

type State = SelectedItem;

const initialState = {
  id: '',
  vender: '',
  customer: '',
  note: '',
  item: null,
  quantity: 1
};

const MINIMUM_QUANTITY = 1;

const useSelectedItemStore = create<State>()(() => ({ ...initialState }));

export const increaseQuantity = () => useSelectedItemStore.setState(state => ({
  quantity: state.quantity + 1
}));

export const decreaseQuantity = () => useSelectedItemStore.setState(state => {
  let updateQuantity = MINIMUM_QUANTITY;

  if (state.quantity > MINIMUM_QUANTITY) {
    updateQuantity = state.quantity - 1;
  }

  return {
    quantity: updateQuantity
  };
});

export const setSelectedItem = (selectedItem: Omit<SelectedItem, 'customer' | 'note' | 'quantity'>) => useSelectedItemStore.setState({
  ...selectedItem
});

export const resetSelectedItem = () => useSelectedItemStore.setState(state => ({
  ...initialState,
  item: null
}));

export const updateNote = (note: string) => useSelectedItemStore.setState(() => ({ note }));
export const updateCustomer = (customer: string) => useSelectedItemStore.setState(() => ({ customer }));

export default useSelectedItemStore;
