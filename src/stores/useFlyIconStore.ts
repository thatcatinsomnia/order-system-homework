import { create } from 'zustand';

type State = {
  from: HTMLDivElement | null;
  to: HTMLDivElement | null;
  counter: HTMLDivElement | null;
};

const useFlyIconStore = create<State>()(() => ({
  from: null,
  to: null,
  counter: null
}));

export const setFromIcon = (element: HTMLDivElement | null) => useFlyIconStore.setState({
  from: element
});

export const setToIcon = (element: HTMLDivElement | null) => useFlyIconStore.setState({
  to: element
});

export const setCounter = (element: HTMLDivElement | null) => useFlyIconStore.setState({
  counter: element
});

export default useFlyIconStore;
