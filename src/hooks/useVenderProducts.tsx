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
};

const url = 'http://localhost:3000/vender-detail';

async function fetchVenderProducts(id: number) {
  const res = await axios.get(url);
  
  if (res.status !== 200) {
    throw new Error('can\'t fetch venders data from json server. 😰');
  }

  // use id to get the data in array
  const data = res.data[0];

  return data as VenderDetail;
}

export default function useVenderProducts() {
  // use random() to generate fake id to get random data
  const id = 1;
  
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['venders', id],
    queryFn: () => fetchVenderProducts(id),
    retry: false
  });

  return {
    data,
    isLoading,
    isError,
    error
  };
}