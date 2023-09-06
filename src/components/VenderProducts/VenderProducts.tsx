import type { Item } from '../../hooks/useVenderProducts';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import randomId from '../../helper/randomId';
import useVenderProducts from '../../hooks/useVenderProducts';
import VenderProductsSkeleton from '../../components/VenderProductsSkeleton';
import usePickedItem, {
  pickItem,
  clearPickedItem,
  updateCustomer,
  updateNote
} from '../../stores/usePickedItemStore';
import { addToShoppingCart } from '../../stores/useShoppingCartStore';
import { clearErrors } from '../../stores/useInputErrorStore';
import FetchErrorMessage from '../../components/FetchErrorMessage';
import ProductItem from '../../components/ProductItem';
import ItemDetail from '../../components/ItemDetail';
import Modal from '../../components/Modal';
import styles from './venderProducts.module.css';

// framer-motoin variants
const ul = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.04,
    }
  }
};

export default function VenderProducts() {
  // we need to match the vender name in detail page,
  // don't do this in real world
  const { state } = useLocation();
  const { venderName } = state;

  const { data, isLoading, isError, error } = useVenderProducts();

  const pickedItem = usePickedItem(state => state);

  if (isLoading) {
    return <VenderProductsSkeleton />;
  }

  if (isError) {
    return <FetchErrorMessage error={error} />
  }

  const handlePickItem = (item: Item) => {
    pickItem({
      vender: venderName,
      customer: '',
      note: '',
      item: item,
      quantity: 1
    });
  };

  const onModalClose = () => {
    clearErrors();
    clearPickedItem();
  };

  const handleAddToShoppingCart = () => {
    const { vender, customer, note, item, quantity } = pickedItem;

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
        <img src={data?.cover} alt={venderName} />
      </div>

      <div className={styles.content}>
        <p className={styles.title}>{venderName}</p>
        <p className={styles.description}>{data?.description}</p>

        <div 
          className={styles.products}

        >
          {data?.products.map(product => (
            <div key={product.id} className={styles.product}>
              <p className={styles.category}>{product.category} 🎉</p>

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

      <Modal isOpen={!!pickedItem.item} onClose={onModalClose}>
        <ItemDetail
          item={pickedItem}
          onUpdateShoppingCart={handleAddToShoppingCart}
          onUpdateCustomer={updateCustomer}
          onUpdateNote={updateNote}
        />
      </Modal>
    </div>
  );
}
