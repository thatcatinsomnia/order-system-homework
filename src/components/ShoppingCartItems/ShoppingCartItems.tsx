import type { OrderItem } from '../../stores/useShoppingCartStore';
import type { Item } from '../../hooks/useVenderProducts';
import { useNavigate } from 'react-router-dom';
import calculateItemPrice from '../../../helper/calculateItemPrice';
import useShoppingCartStore, { clearEditItem } from '../../stores/useShoppingCartStore';
import CartItem from '../CartItem';
import ProductItem from '../ProductItem';
import Modal from '../Modal';
import styles from './shoppingCartItems.module.css';

const FEE = 99;

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
  const editItem = useShoppingCartStore(state => state.editItem);
  const venderName = shoppingCart[0]?.venderName;  

  const itemCount = calculateItemCount(shoppingCart);
  const finalPrice = calculateFinalPrice(shoppingCart);

  const navigate = useNavigate();
  
  if (shoppingCart.length === 0) {
    return (
      <div className={styles.empty}>
        <p>您的購物車是空的</p>
        <button onClick={() => navigate('/')}>立即前往購物</button>
      </div>
    );
  }

  return (
    <>
      <div className={styles.container}>
        <h3 className={styles.title}>{venderName}</h3>
        <ul className={styles.cartList}>
          {shoppingCart.map(item => <CartItem key={item.id} item={item} />)}
        </ul>

        <div className={styles.cta}>
          <div className={styles.price}>
            <p>總計: ${finalPrice}</p>
            (<small>外送費 ${FEE}</small>)
          </div>
          <button>前往結帳 ({itemCount} 件商品)</button>
        </div>
      </div>

      <Modal isOpen={!!editItem} onClose={clearEditItem}>
        <ProductItem item={editItem?.item as Item} venderName={editItem?.venderName as string} />
      </Modal>
    </>
  );
}