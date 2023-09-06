import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

type VenderDetail = {
  id: number;
  cover: string
  description: string;
  products: Product[];
};

type Product = {
  id: number;
  category: string;
  items: Item[];
};

export type Item = {
  id: number;
  name: string;
  price: number;
  variants: Variant[];
};

export type VariantRadio = {
  type: 'radio';
  id: number;
  name: string;
  price: number;
  options: Option[];
  selected?: string;
  isRequired: boolean;
};

export type VariantCheckbox = {
  type: 'checkbox';
  id: number;
  name: string;
  price: number;
  isChecked?: boolean;
};

export type Variant = VariantRadio | VariantCheckbox;

export type Option = {
  name: string;
  value: string | number;
};


const url = 'http://localhost:3000/vender-detail';

async function fetchVenderProducts() {
  const res = await axios.get(url);

  if (res.status !== 200) {
    throw new Error('can\'t fetch venders data from json server. 😰');
  }

  const data = res.data[0];

  return data as VenderDetail;
}

export default function useVenderProducts() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['venders', 1],
    queryFn: () => fetchVenderProducts(),
    retry: false
  });

  return {
    data,
    isLoading,
    isError,
    error
  };
}