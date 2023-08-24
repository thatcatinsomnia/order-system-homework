import type { Vender as VenderType } from '../../hooks/useVenders';
import styles from './vender.module.css';

type Props = {
  vender: VenderType
}

export default function Vender({ vender }: Props) {
  return (
    <div className={styles.shop}>
      <div className={styles.imgBox}>
        <img src={vender.image} />
      </div>
      <p>{vender.name}</p>
    </div>
  );
}
