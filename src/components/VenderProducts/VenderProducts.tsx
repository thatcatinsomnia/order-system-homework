import type { Item } from '../../hooks/useVenderProducts';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, useAnimate } from 'framer-motion';
import randomId from '../../helper/randomId';
import useVenderProducts from '../../hooks/useVenderProducts';
import VenderProductsSkeleton from '../../components/VenderProductsSkeleton';
import usePickedItem, {
  pickItem,
  clearPickedItem,
  updateCustomer,
  updateNote
} from '../../stores/usePickedItemStore';
import useShoppingCartStore, { addToShoppingCart } from '../../stores/useShoppingCartStore';
import { clearErrors } from '../../stores/useInputErrorStore';
import FetchErrorMessage from '../../components/FetchErrorMessage';
import ProductItem from '../../components/ProductItem';
import ItemDetail from '../../components/ItemDetail';
import Modal from '../../components/Modal';
import styles from './venderProducts.module.css';
import useFlyIconStore from '../../stores/useFlyIconStore';

// framer-motoin variants
const ul = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      bounce: 0,
      staggerChildren: 0.04,
      delayChildren: 0.2
    }
  }
};

const MotionModal = motion(Modal);

export default function VenderProducts() {
  const [scope, animate] = useAnimate();
  const [flyToShoppingCart, setFlyToShoppingCart] = useState(false);

  // we need to match the vender name in detail page,
  // don't do this in real world
  const { state } = useLocation();
  const { vender } = state;

  const { data, isLoading, isError, error } = useVenderProducts();
  const {from, to, counter } = useFlyIconStore(state => state);
  const pickedItem = usePickedItem(state => state);
  const shoppingCart = useShoppingCartStore(state => state.cart);

  if (isLoading) {
    return <VenderProductsSkeleton />;
  }

  if (isError) {
    return <FetchErrorMessage error={error} />
  }

  const handlePickItem = (item: Item) => {
    pickItem({
      vender: vender,
      customer: '',
      note: '',
      item: item,
      quantity: 1
    });
  };

  const onModalClose = () => {
    setFlyToShoppingCart(false);
    clearErrors();
    clearPickedItem();
  };
  
  const startAnimation = async () => {
    if (!scope.current) {
      return;
    }

    if (!from || !to || !counter) {
      return;
    }

    const { left: fromLeft, top: fromTop } = from.getBoundingClientRect();
    const { left: toLeft, top: toTop } = to.getBoundingClientRect();

    const deltaX = toLeft - fromLeft;
    const deltaY = toTop - fromTop;


    // animation depends on shopping cart length
    if (shoppingCart.length > 0) {
      await animate([
        // hiden scroll bar
        ['#modal-srcollable-container', { overflowY: 'hidden' }],

        // make modal content to become circle
        ['#wrapper > div:first-child', { clipPath: ['circle(100%)', 'circle(20px)'], pointerEvents: ['none', 'none'] }, { at: '-1' }],
  
        // hide the circle and show shopping cart icon
        ['#wrapper > div:first-child', { opacity: 0 }],
        ['#fly-shopping-cart', { opacity: 1 }, { at: '-0.34' }],
        ['#fly-shopping-cart > svg', { y: ['-150%', '0%'] }, { at: '-0.38' }],
        
        // make overlay lighter but not transparent
        ['#overlay', { opacity: 0.3 }, { at: '-0.8' }],
  
        // fly the cart icon
        ['#fly-shopping-cart', { x: deltaX, y: deltaY }, { at: '+0.4' }],
  
        // when icon is on header shopping cart position, make it hidden 
        ['#fly-shopping-cart', { opacity: 0 }, { at: '-0.1' }],
  
        // then make overlay transparent, so we can see the jumping counter
        ['#overlay', { opacity: 0 }],
  
        // counter jumping animation
        [counter, { y: -10, rotate: [-32, 328], scale: 1.2 }, { at: '-0.44' }],
        [counter, { y: 0, scale: 1 }]
      ]);

      return;
    }

    // the first item add to cart
    await animate([
      // hiden scroll bar
      ['#modal-srcollable-container', { overflowY: 'hidden' }],
      
      // make modal content to become circle
      ['#wrapper > div:first-child', { clipPath: ['circle(100%)', 'circle(20px)'], pointerEvents: ['none', 'none'] }, { at: '-1' }],

      // hide the circle and show shopping cart icon
      ['#wrapper > div:first-child', { opacity: 0 }],
      ['#fly-shopping-cart', { opacity: 1 }, { at: '-0.34' }],
      ['#fly-shopping-cart > svg', { y: ['-150%', '0%'] }, { at: '-0.38' }],
      
      // make overlay lighter but not transparent
      ['#overlay', { opacity: 0.3 }, { at: '-0.8' }],

      // fly the cart icon
      ['#fly-shopping-cart', { x: deltaX, y: deltaY }, { at: '+0.4' }],

      // when icon is on header shopping cart position, make it hidden 
      ['#fly-shopping-cart', { opacity: 0 }, { at: '-0.1' }],

      // then make overlay transparent, so we can see the jumping counter
      ['#overlay', { opacity: 0 }],
      // counter jumping animation
      [counter, { y: -12, scale: 1.15, opacity: 1, rotate: -32 }, { at: '-0.44' }],
      [counter, { y: 0, scale: 1 }]
    ]);
  };

  const handleAddToShoppingCart = async () => {
    if(flyToShoppingCart) {
      return;
    }

    const { vender, customer, note, item, quantity } = pickedItem;

    setFlyToShoppingCart(true);

    await startAnimation();

    addToShoppingCart({
      id: randomId(),
      vender,
      customer,
      note,
      item: item as Item,
      quantity
    });

    onModalClose();
  };

  return (
    <div>
      <div className={styles.cover}>
        <img src={data?.cover} alt={vender} />
      </div>

      <div className={styles.content}>
        <motion.p
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ bounce: 0 }}
          className={styles.title}
        >
          {vender}
        </motion.p>

        <motion.p
          className={styles.description}
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.03, bounce: 0 }}
        >
          {data?.description}
        </motion.p>

        <div
          className={styles.products}
        >
          {data?.products.map(product => (
            <div key={product.id} className={styles.product}>
              <motion.p
                className={styles.category}
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05, bounce: 0 }}
              >
                {product.category} 🎉
              </motion.p>

              <motion.ul
                className={styles.productItems}
                initial="hidden"
                animate="visible"
                variants={ul}
              >
                {product.items.map(item => <ProductItem key={item.id} item={item} onPickItem={handlePickItem} />)}
              </motion.ul>
            </div>
          ))}
        </div>
      </div>
      

      <MotionModal
        isOpen={!!pickedItem.item} 
        onClose={onModalClose}
        ref={scope}
        isAnimate={flyToShoppingCart}
      >
        <ItemDetail
          item={pickedItem}
          onUpdateShoppingCart={handleAddToShoppingCart}
          onUpdateCustomer={updateCustomer}
          onUpdateNote={updateNote}
        />
      </MotionModal>
    </div>
  );
}
