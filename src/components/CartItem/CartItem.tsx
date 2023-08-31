import type { OrderItem } from '../../stores/useShoppingCartStore';
import { FiMinus, FiPlus, FiEdit as FiEdit } from 'react-icons/fi';
import { decrease, increase } from '../../stores/useShoppingCartStore';
import CartItemVariants from '../CartItemVariants/CartItemVariants';
import styles from './cartItem.module.css';

type Props = {
  item: OrderItem;
};

function calculateTotalPrice(item: OrderItem) {
  const itemPrice = item.item.price;

  const variantsTotalPrice = item.item.variants.reduce((total, variant) => {
    if (variant.type === 'radio') {
      total += variant.price;
    }

    if (variant.type === 'checkbox' && variant.checked) {
      total += variant.price
    }

    return total;
  }, 0);

  return (itemPrice + variantsTotalPrice) * item.quantity
}

export default function CartItem({ item }: Props) {
  const totalPrice = calculateTotalPrice(item);

  return (
    <div className={styles.cartItem}>
      <div className={styles.imgBox}>
        <img src="https://loremflickr.com/140/140/drinks,meals" alt={item.item.name}/>
      </div>

      <div className={styles.content}>
        <div className={styles.cartItemHeader}>
          <p className={styles.title}>{item.item.name}</p>
          <div className={styles.quantityBox}>
            <button 
              className={styles.quantityButton}
              onClick={() => decrease(item.id)}
            >
              <FiMinus />
            </button>
            <span className={styles.quantity}>{item.quantity}</span>
            <button 
              className={styles.quantityButton}
              onClick={() => increase(item.id)}
            >
              <FiPlus />
            </button>
          </div>
        </div>

        <CartItemVariants variants={item.item.variants} />

        <div className={styles.cartItemFooter}>
          <button className={styles.cartItemEditButton}>
            <span>編輯</span>
            <FiEdit />
          </button>
          <p className={styles.price}>${totalPrice}</p>
        </div>

      </div>
    </div>
  );
}
