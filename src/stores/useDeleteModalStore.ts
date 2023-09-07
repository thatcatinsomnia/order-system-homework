import { create } from 'zustand';

type State = {
  isOpened: boolean;
  deleteId: string | null;
};

const useDeleteModalStore = create<State>()(() => ({
  isOpened: false,
  deleteId: null
}));

export const closeDeleteModal = () => useDeleteModalStore.setState({
  isOpened: false,
  deleteId: null
});

export const setDeleteModalOpened = (opened: boolean) => useDeleteModalStore.setState({
  isOpened: opened
});

export const setDeleteId = (id: string) => useDeleteModalStore.setState({
  deleteId: id,
  isOpened: true
});

export const resetDeleteId = () => useDeleteModalStore.setState({
  deleteId: null
});

export default useDeleteModalStore;