import useVenders from '../../hooks/useVenders';
import Vender from '../Vender';
import styles from './venderList.module.css';

export default function VenderList() {
  const { data, isLoading, isError, error } = useVenders();

  if (isLoading) {
    return 'loading...';
  }

  if (isError) {
    return (
      <div>
        <p>OOps, Something error !!! 😱</p>
        <p>{error?.message}</p>
      </div>
    );
  }

  const isEmptyData = !data || !data.length;

  return (
    <div className={styles.venderList}>
      {isEmptyData ? "No Shops Data" : (
        data.map(vender => <Vender key={vender.id} vender={vender} />)
      )}
    </div>
  );
}