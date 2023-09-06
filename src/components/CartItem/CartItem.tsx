import type { OrderItem } from '../../stores/useShoppingCartStore';
import { FiMinus, FiPlus, FiEdit, FiTrash2 as FiTrash } from 'react-icons/fi';
import calculateItemPrice from '../..//helper/calculateItemPrice';
import { pickItem } from '../../stores/usePickedItemStore';
import { increaseById, decreaseById, deleteById } from '../../stores/useShoppingCartStore';
import CartItemVariants from '../CartItemVariants';
import styles from './cartItem.module.css';

type Props = {
  orderItem: OrderItem;
};

export default function CartItem({ orderItem }: Props) {
  const totalPrice = calculateItemPrice(orderItem);

  const handleDelete = () => {
    const yes = confirm(`delete ${orderItem.id} ?`);

    if (yes) {
      deleteById(orderItem.id);
    }
  };

  return (
    <li className={styles.cartItem}>
      <div className={styles.imgBox}>
        <img src="https://loremflickr.com/140/140/drinks,meals" alt={orderItem.item.name}/>
      </div>

      <div className={styles.content}>
        <div className={styles.header}>
          <div className={styles.title}>
            <p className={styles.itemName}>{orderItem.item.name}</p>
            <button className={styles.deleteButton} onClick={handleDelete}><FiTrash size={14} /></button>
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

          <p className={styles.price}>
            ${totalPrice}
          </p>
        </div>
      </div>
    </li>
  );
}
