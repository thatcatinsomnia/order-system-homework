import { FadeLoader } from 'react-spinners';
import styles from './loadingSpinner.module.css';

export default function LoadingSpinner() {
  return (
    <div className={styles.wrapper}>
      <FadeLoader />
    </div>
  );
}
