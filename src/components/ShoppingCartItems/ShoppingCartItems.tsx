import type { OrderItem } from '../../stores/useShoppingCartStore';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import calculateItemPrice from '../../helper/calculateItemPrice';
import useShoppingCartStore, { updateShoppingCart } from '../../stores/useShoppingCartStore';
import usePickedItemStore, { updateCustomer, updateNote, clearPickedItem } from '../../stores/usePickedItemStore';
import CartItem from '../CartItem';
import ItemDetail from '../ItemDetail';
import Modal from '../Modal';
import styles from './shoppingCartItems.module.css';

const FEE = 99;

// framer-motion animation variants
const list = { 
  hidden: { 
    opacity: 0
  }, 
  visible: { 
    opacity: 1,
    transition: {
      staggerChildren: 0.04
    }
  },

};

function calculateItemCount(cart: OrderItem[]) {
  if (cart.length === 0) {
    return 0;
  }

  return cart.reduce((count, item) => count += item.quantity, 0);
}

function calculateFinalPrice(cart: OrderItem[]) {
  const result = (cart as OrderItem[]).reduce((total, item) => {
    const itemPrice = calculateItemPrice(item);

    return total + itemPrice;
  }, 0);

  return result + FEE;
}

export default function ShoppingCartItems() {
  const shoppingCart = useShoppingCartStore(state => state.cart);
  const pickedItem = usePickedItemStore(state => state);
  const venderName = shoppingCart[0]?.vender;

  const itemCount = calculateItemCount(shoppingCart);
  const finalPrice = calculateFinalPrice(shoppingCart);

  const navigate = useNavigate();

  const handleUpdateShoppingCart = () => {
    updateShoppingCart(pickedItem as OrderItem);
    clearPickedItem();
  };

  if (shoppingCart.length === 0) {
    return (
      <div className={styles.empty}>
        <p>您的購物車是空的</p>
        <button onClick={() => navigate('/')}>立即前往購物</button>
      </div>
    );
  }

  const isOpened = !!pickedItem.item;

  return (
    <>
      <div className={styles.container}>
        <h3 className={styles.title}>{venderName}</h3>
        <motion.ul 
          className={styles.cartList}
          initial="hidden"
          animate="visible"
          variants={list}
        >
          {shoppingCart.map(orderItem => (
            <CartItem
              key={orderItem.id}
              orderItem={orderItem} 
            />
          ))}
        </motion.ul>

        <div className={styles.ctaWrapper}>
          <div className={styles.cta}>
            <div className={styles.price}>
              <p>總計: <span className={styles.total}>${finalPrice}</span></p>
              <small className={styles.fee}>(外送費 ${FEE})</small>
            </div>
            <button>前往結帳 (<span className={styles.count}>{itemCount}</span> 件商品)</button>
            </div>
          </div>
        </div>

      <Modal isOpen={isOpened} onClose={clearPickedItem}>
        <ItemDetail
          item={pickedItem}
          onUpdateCustomer={(customer) => updateCustomer(customer)}
          onUpdateNote={(note) => updateNote(note)}
          onUpdateShoppingCart={handleUpdateShoppingCart}
          isEdit={!!pickedItem.id}
        />
      </Modal>
    </>
  );
}