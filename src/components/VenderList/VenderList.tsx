import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import useVenders from '../../hooks/useVenders';
import Vender from '../Vender';
import VenderListSkeleton from '../VenderListSkeleton';
import styles from './venderList.module.css';

export default function VenderList() {
  const { ref, inView } = useInView();
  const { data, isLoading, fetchNextPage, hasNextPage, isError, error } = useVenders();

  if (isLoading) {
    return <VenderListSkeleton />;
  }

  if (isError) {
    return (
      <div>
        <p>OOps, Something error !!! 😱</p>
        <p>{error?.message}</p>
      </div>
    );
  }

  useEffect(() => {
    if(!inView) {
      return;
    }

    // todo: fetch and render more vender list
    console.log('fetch more data');
  }, [inView]);

  const isEmptyData = (!data || !data?.pages.length) && !isLoading;

  return (
    <>
      <div className={styles.venderList}>
        {isEmptyData ? "No Shops Data" : (
          data?.pages.map(group => (
            group.data.map(vender => (
              <Vender key={vender.id} vender={vender} />
            ))
          ))
        )}

        <div ref={ref}></div>
      </div>
    </>
  );
}