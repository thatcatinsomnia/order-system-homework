import type { Item } from '../hooks/useVenderProducts';
import { create } from 'zustand';

export type PickedItem = {
  id: string;
  vender: string;
  customer: string;
  note: string;
  item: Item | null;
  quantity: number;
};

type State = PickedItem;

const MINIMUM_QUANTITY = 1;

const initialState = {
  id: '',
  vender: '',
  customer: '',
  note: '',
  item: null,
  quantity: MINIMUM_QUANTITY
};


const usePickedItemStore = create<State>()(() => ({ ...initialState }));

export const increase = () => usePickedItemStore.setState(state => ({
  quantity: state.quantity + 1
}));

export const decrease = () => usePickedItemStore.setState(state => {
  let updateQuantity = MINIMUM_QUANTITY;

  if (state.quantity > MINIMUM_QUANTITY) {
    updateQuantity = state.quantity - 1;
  }

  return {
    quantity: updateQuantity
  };
});

export const pickItem = (item: Item) => usePickedItemStore.setState({ item });

export const clearPickedItem = () => usePickedItemStore.setState({ ...initialState });

export const updateNote = (note: string) => usePickedItemStore.setState({ note });
export const updateCustomer = (customer: string) => usePickedItemStore.setState({ customer });

export default usePickedItemStore;
