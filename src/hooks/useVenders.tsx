import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export type Vender = {
  id: string;
  name: string;
  image: string;
};

type Product = {
  id: number;
  name: string;
  description?: string;
  price: number;
  variants: Variant[];
};

type Variant = {
  id: number;
  name: string;
  isRequired: boolean;
  options: Option[];
};

type Option = {
  id: number;
  name: string;
  extraCharge: number;
};

async function fetchVenders() {
  const res = await axios('http://localhost:3000/venders');
  
  if (res.status !== 200) {
    throw new Error('can\'t fetch venders data from json server. 😰');
  }

  return res.data as Vender[];
}

export default function useVenders() {
  const { data, isLoading, isError, error } = useQuery<Vender[], Error>({
    queryKey: ['venders'],
    queryFn: fetchVenders
  });

  return {
    data,
    isLoading,
    isError,
    error
  };
}
