import { create } from 'zustand';

export type Errors = {
  [name: string]: Error;
};

type Error = {
  key: string;
  message: string;
} | null;

type State = {
  errors: Errors;
  inputRefs: object | {};
  showAnimation: boolean;
  timer: number | null;
};

const useInputErrorStore = create<State>()(() => ({
  errors: {},
  inputRefs: {},
  showAnimation: false,
  timer: null
}));

export const addError = (errors: Errors) => useInputErrorStore.setState(state=> ({
  errors: {
    ...state.errors,
    ...errors
  }
}));

export const setError = (key: string, error: Error) => useInputErrorStore.setState(state => ({
  errors: {
    ...state.errors,
    [key]: error
  }
}));

export const clearErrors = () => useInputErrorStore.setState({
  errors: {}
});

export const setInputRef = (fieldName: string, ref: HTMLElement | null) => useInputErrorStore.setState(state => {
  return {
    inputRefs: {
      ...state.inputRefs,
      [fieldName]: ref
    }
  };
});

export default useInputErrorStore;
