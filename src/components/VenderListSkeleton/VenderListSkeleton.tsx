import styles from './venderListSkeleton.module.css';
import VenderSkeleton from '../VenderSkeleton';

// equal to actual venders data fetched from api
const SIZE = 20;

export default function VenderListSkeleton() {
  return (
    <div className={styles.venderListSkeleton}>
      {Array.from({ length: SIZE }).map((_, i) => (
        <VenderSkeleton key={i} />
      ))}
    </div>
  );
}
