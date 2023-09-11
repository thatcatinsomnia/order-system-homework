import { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import useShoppingCartStore from '../../stores/useShoppingCartStore';
import { setToIcon, setCounter } from '../../stores/useFlyIconStore';
import { FaShoppingCart } from 'react-icons/fa';
import { ReactComponent as Logo } from './eating_more.svg';
import styles from './header.module.css';

export default function Header() {
  const ref = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLDivElement>(null);
  const shoppingCart = useShoppingCartStore(state => state.cart);

  useEffect(() => {
    if (!ref.current) {
      return;
    }

    setToIcon(ref.current);
  }, []);

  useEffect(() => {
    if (!counterRef.current) {
      return;
    }

    setCounter(counterRef.current);
  }, []);

  return (
    <header className={styles.header}>
      <Link className={styles.logoLink} to="/">
        <Logo />
      </Link>

      <div className={styles.userMenu} ref={ref}>
        <Link className={styles.shoppingCart} to="/shopping-cart">
          <FaShoppingCart size={26} />
          <span 
            className={`${styles.count} ${shoppingCart.length === 0 ? styles.opacity : 0}`} 
            ref={counterRef}
          >
            {shoppingCart.length || 0}
          </span>
        </Link>
      </div>
    </header>
  );
}
