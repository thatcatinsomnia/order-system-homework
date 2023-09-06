import type { Item } from '../../hooks/useVenderProducts';
import { motion } from 'framer-motion';
import { FiPlus } from 'react-icons/fi';
import styles from './productItem.module.css';

type Props = {
  item: Item;
  onPickItem: (item: Item) => void;
};

// framer-motion variants
const li = {
  hidden: {
    opacity: 0,
    x: 32
  },
  visible: {
    opacity: 1,
    x: 0
  }
};

export default function ProductItem({ item, onPickItem }: Props) {
  return (
    <motion.li
      className={styles.item} 
      variants={li}
      onClick={() => onPickItem(item)}
    >
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
    </motion.li>
  );
}
