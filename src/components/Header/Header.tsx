import { Link } from 'react-router-dom';
import useShoppingCartStore from '../../stores/useShoppingCartStore';
import { FiShoppingCart } from 'react-icons/fi';
import { ReactComponent as Logo } from './eating_more.svg';
import styles from './header.module.css';

export default function Header() {
  const shoppingCart = useShoppingCartStore(state => state.cart);

  return (
    <header className={styles.header}>
      <Link className={styles.logoLink} to="/">
        <Logo />
      </Link>

      <div className={styles.userMenu}>
        <Link className={styles.shoppingCartButton} to="/shopping-cart">
          <FiShoppingCart size={20} />
          {shoppingCart.length > 0 && <span className={styles.count}>{shoppingCart.length}</span>}
        </Link>
      </div>
    </header>
  );
}
