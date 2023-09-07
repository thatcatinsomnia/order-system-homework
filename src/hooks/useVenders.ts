import { useInfiniteQuery } from '@tanstack/react-query';
import axios from 'axios';

export type Vender = {
  id: string;
  name: string;
  image: string;
};

type PagedVenders = {
  nextPage: number;
  data: Vender[];
}

async function fetchVenders({ pageParam = 1 }) {
  const res = await axios<Vender[]>(`http://localhost:3000/venders?_page=${pageParam}&_limit=20`);

  if (res.status !== 200) {
    throw new Error('can\'t fetch venders data from json server. 😰');
  }

  return {
    nextPage: pageParam + 1,
    data: res.data
  };
}

const MAX_PAGE_SIZE = 10;

export default function useVenders() {
  const {
    data,
    isLoading,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
    isError,
    error
  } = useInfiniteQuery<PagedVenders, Error>({
    queryKey: ['venders'],
    queryFn: fetchVenders,
    getNextPageParam: (lastPage, _pages) => {
      if (lastPage.nextPage < MAX_PAGE_SIZE) {
        return lastPage.nextPage;
      }

      return undefined;
    },
    retry: false
  });

  return {
    data,
    isLoading,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
    isError,
    error
  };
}
