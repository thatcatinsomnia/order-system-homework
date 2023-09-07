import type { OrderItem } from '../../stores/useShoppingCartStore';
import { useEffect, useRef } from 'react';
import { motion, useSpring } from 'framer-motion';
import { FiMinus, FiPlus, FiEdit, FiTrash2 as FiTrash } from 'react-icons/fi';
import calculateItemPrice from '../..//helper/calculateItemPrice';
import { pickItem } from '../../stores/usePickedItemStore';
import { increaseById, decreaseById } from '../../stores/useShoppingCartStore';
import { setDeleteId } from '../../stores/useDeleteModalStore';
import CartItemVariants from '../CartItemVariants';
import styles from './cartItem.module.css';

type Props = {
  orderItem: OrderItem;
};


// framer motion variants
const item = {
  hidden: {
    x: 28,
    opacity: 0
  },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.4
    }
  }
};


export default function CartItem({ orderItem }: Props) {
  const totalPriceRef = useRef<HTMLSpanElement>(null);
  const totalPrice = calculateItemPrice(orderItem);
  const spring = useSpring(totalPrice, { bounce: 0 });

  useEffect(() => {
    spring.on('change', (latest: number) => {
      if (totalPriceRef.current) {
        totalPriceRef.current.textContent = `$${latest.toFixed(0)}`
      }
    });

    spring.set(totalPrice);

    return () => spring.clearListeners();
  }, [totalPrice]);

  return (
    <motion.li
      layout
      variants={item}
      exit={{
        // set exit directly to keep staggerChildren work
        opacity: 0,
        rotate: 12,
        y: 240,
        transition: {
          delay: 0.03,
          duration: 0.36
        }
      }}
    >
    <div className={styles.cartItem}>
      <div className={styles.imgBox}>
        <img src="https://loremflickr.com/140/140/drinks,meals" alt={orderItem.item.name}/>
      </div>

      <div className={styles.content}>
        <div className={styles.header}>
          <div className={styles.title}>
            <p className={styles.itemName}>{orderItem.item.name}</p>
            <button className={styles.deleteButton} onClick={() => setDeleteId(orderItem.id)}><FiTrash size={14} /></button>
          </div>

          <div className={styles.quantityBox}>
            <button
              className={styles.quantityButton}
              onClick={() => decreaseById(orderItem.id)}
            >
              <FiMinus />
            </button>
            <span className={styles.quantity}>{orderItem.quantity}</span>
            <button
              className={styles.quantityButton}
              onClick={() => increaseById(orderItem.id)}
            >
              <FiPlus />
            </button>
          </div>
        </div>

        <CartItemVariants variants={orderItem.item.variants} />

        <div className={styles.footer}>
          <button
            className={styles.editButton}
            onClick={() => pickItem(orderItem)}
          >
            <span>編輯</span>
            <FiEdit />
          </button>

          <motion.span className={styles.price} ref={totalPriceRef}>
            ${totalPrice}
          </motion.span>
        </div>
      </div>
    </div>

    </motion.li>
  );
}
