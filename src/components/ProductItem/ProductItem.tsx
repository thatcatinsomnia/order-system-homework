import type { Item } from '../../hooks/useVenderProducts';
import { FiPlus } from 'react-icons/fi';
import styles from './productItem.module.css';

type Props = {
  item: Item;
  onPickItem: (item: Item) => void;
};

export default function ProductItem({ item, onPickItem }: Props) {
  return (
    <li className={styles.item} onClick={() => onPickItem(item)}>
      <img 
        className={styles.itemImg}
        src={`https://loremflickr.com/100/100/drinks,meals`} 
      />

      <div className={styles.itemContent}>
        <p className={styles.itemName}>{item.name}</p>
        <p>$ {item.price}</p>
      </div>

      <button className={styles.itemPlusButton}>
        <FiPlus />
      </button>
    </li>
  );
}
