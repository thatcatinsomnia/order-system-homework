import type { Item } from '../../hooks/useVenderProducts';
import { FiPlus } from 'react-icons/fi';
import styles from './productItem.module.css';

type Props = {
  item: Item;
};

export default function ProductItem({ item }: Props) {
  return (
    <li className={styles.productItem}>
      <img 
        className={styles.img}
        src="https://picsum.photos/100/100" 
      />

      <div className={styles.content}>
        <p className={styles.name}>{item.name}</p>
        <p>$ {item.price}</p>
      </div>

      <button className={styles.button}>
        <FiPlus />
      </button>
    </li>
  );
}
