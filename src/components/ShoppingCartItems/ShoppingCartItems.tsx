import type { OrderItem } from '../../stores/useShoppingCartStore';
import { useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence, motion, useSpring } from 'framer-motion';
import calculateItemPrice from '../../helper/calculateItemPrice';
import useShoppingCartStore, { updateShoppingCart, deleteById } from '../../stores/useShoppingCartStore';
import usePickedItemStore, { updateCustomer, updateNote, clearPickedItem } from '../../stores/usePickedItemStore';
import useDeleteModalStore, { closeDeleteModal } from '../../stores/useDeleteModalStore';
import CartItem from '../CartItem';
import ItemDetail from '../ItemDetail';
import Modal from '../Modal';
import styles from './shoppingCartItems.module.css';

const FEE = 99;

// framer-motion animation variants
const list = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.06
    }
  }
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
  const deleteModal= useDeleteModalStore(state => state);

  const venderName = shoppingCart[0]?.vender;

  const itemCount = calculateItemCount(shoppingCart);
  const finalPrice = calculateFinalPrice(shoppingCart);

  const finalPriceRef = useRef<HTMLSpanElement>(null);
  const spring = useSpring(finalPrice, { bounce: 0 });

  const navigate = useNavigate();

  useEffect(() => {
    spring.on('change', (latest: number) => {
      if (finalPriceRef.current) {
        finalPriceRef.current.textContent = latest.toFixed(0);
      }
    });

    spring.set(finalPrice);

    return () => spring.clearListeners();
  }, [finalPrice]);

  const handleUpdateShoppingCart = () => {
    updateShoppingCart(pickedItem as OrderItem);
    clearPickedItem();
  };

  const handleDeleteItemFromShoppingCart = () => {
    deleteById(deleteModal.deleteId);
    closeDeleteModal();
  };

  if (shoppingCart.length === 0) {
    return (
      <motion.div
        className={styles.empty}
        initial={{ opacity: 0, y: 36 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ bounce: 0 }}
      >
        <p>您的購物車是空的</p>
        <button onClick={() => navigate('/')}>立即前往購物</button>
      </motion.div>
    );
  }

  const isOpened = !!pickedItem.item;

  return (
    <>
      <div className={styles.container}>
        <motion.h3
          className={styles.title}
          initial={{ opacity: 0, x: 28 }}
          animate={{ opacity: 1, x: 0 }}
        >
          {venderName}
        </motion.h3>
          <motion.ul
            className={styles.cartList}
            style={{ display: 'flex', flexDirection: 'column', gap: '10px'}}
            variants={list}
            initial="hidden"
            animate="visible"
          >
            <AnimatePresence mode="popLayout">
              {shoppingCart.map(orderItem => (
                <CartItem key={orderItem.id} orderItem={orderItem} />
              ))}
            </AnimatePresence>
          </motion.ul>

        <div className={styles.ctaWrapper}>
          <div className={styles.cta}>
            <div className={styles.price}>
              <p>總計: <span className={styles.total} ref={finalPriceRef}>${finalPrice}</span></p>
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

      <Modal
        isOpen={deleteModal.isOpened}
        onClose={closeDeleteModal}
      >
        <div className={styles.modalContent}>
          <p>是否要刪除該筆餐點 ?</p>
          <div className={styles.editCta}>
            <button
              className={styles.editCtaDeleteBtn}
              onClick={handleDeleteItemFromShoppingCart}
            >
              刪除
            </button>
            <button
              className={styles.editCtaCancelBtn}
              onClick={closeDeleteModal}
            >
              取消
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}