import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import useVenders from '../../hooks/useVenders';
import Vender from '../Vender';
import FetchErrorMessage from '../FetchErrorMessage';
import VenderListSkeleton from '../VenderListSkeleton';
import LoadingSpinner from '../LoadingSpinner'; 
import styles from './venderList.module.css';

export default function VenderList() {
  const { ref, inView } = useInView();
  const { data, isLoading, fetchNextPage, hasNextPage, isError, error } = useVenders();

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView]);

  if (isLoading) {
    return <VenderListSkeleton />;
  }

  if (isError) {
    return <FetchErrorMessage error={error} />
  }

  const isEmptyData = (!data || !data.pages.length);

  return (
    <div className={styles.container}>
      <div className={styles.venderList}>
        {isEmptyData ? "No Venders Data" : (
          data.pages.map(group => (
            group.data.map(vender => (
              <Vender key={vender.id} vender={vender} />
            ))
          ))
        )}
      </div>

      <div ref={ref}>
        {inView && <LoadingSpinner />}
      </div>
    </div>
  );
}