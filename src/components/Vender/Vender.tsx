import type { Vender as VenderType } from '../../hooks/useVenders';
import { Link } from 'react-router-dom';
import styles from './vender.module.css';

type Props = {
  vender: VenderType;
}

export default function Vender({ vender }: Props) {
  return (
    <Link 
      className={styles.vender}
      to={`/venders/${vender.id}/products`}
      state={{ vender: vender.name }}
    >
      <div className={styles.imgBox}>
        <img src={vender.image} alt={vender.name} />
      </div>
      <p>{vender.name}</p>
    </Link>
  );
}
