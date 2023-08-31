import useShoppingCartStore from '../../stores/useShoppingCartStore';
import CartItem from '../CartItem';
import styles from './shoppingCartItems.module.css';

export default function ShoppingCartItems() {
  const shoppingCart = useShoppingCartStore(state => state.cart);
  const venderName = shoppingCart[0]?.venderName;  

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>{venderName}</h3>
      <ul className={styles.cartList}>
        {shoppingCart.map(item => <CartItem key={item.id} item={item} />)}
      </ul>
    </div>
  );
}