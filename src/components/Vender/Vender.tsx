import type { Vender as VenderType } from '../../hooks/useVenders';
import styles from './vender.module.css';

type Props = {
  vender: VenderType
}

export default function Vender({ vender }: Props) {
  return (
    <div className={styles.vender}>
      <div className={styles.imgBox}>
        <img src={vender.image} alt={vender.name} />
      </div>
      <p>{vender.name}</p>
    </div>
  );
}
