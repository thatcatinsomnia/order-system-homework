import type { Item } from '../../hooks/useVenderProducts';
import { useLocation } from 'react-router-dom';
import randomId from '../../../helper/randomId';
import useVenderProducts from '../../hooks/useVenderProducts';
import VenderProductsSkeleton from '../VenderProductsSkeleton';
import useSelectedItemStore, { setSelectedItem, resetSelectedItem, updateNote, updateCustomer } from '../../stores/useSelectedItemStore';
import FetchErrorMessage from '../FetchErrorMessage';
import ProductItem from '../ProductItem';
import ItemDetail from '../ItemDetail';
import Modal from '../Modal';
import styles from './venderProducts.module.css';

export default function VenderProducts() {
  // we need to match the vender name in detail page, 
  // don't do this in real world 
  const { state } = useLocation();
  const { venderName } = state;

  const { data, isLoading, isError, error } = useVenderProducts();

  const selectedItem = useSelectedItemStore(state => state);

  if (isLoading) {
    return <VenderProductsSkeleton />;
  }

  if (isError) {
    return <FetchErrorMessage error={error} />
  }


  const handleSelectItem = (item: Item) => {
    console.log('select item');
    console.log(item);
    setSelectedItem({
      id: randomId(),
      item: item,
      vender: venderName
    });
  };

  const onModalClose = () => {
    resetSelectedItem();
  };

  const handleAddToShoppingCart = () => {
    console.log('add to cart');
    console.log(selectedItem);
    // if (!customer) {
    //   // TODO: show alert - customer field is required.
    //   alert('please typing customer field.')
    //   return;
    // }
    
    // addToShoppingCart({
    //   id: randomId(),
    //   venderName: venderName,
    //   customer: customer,
    //   note: note,
    //   item: item,
    //   quantity: quantity
    // });

    // onModalClose();
  };

  return (
    <div>
      <div className={styles.cover}>
        <img src={data?.cover} alt={venderName} />
      </div>

      <div className={styles.content}>
        <p className={styles.title}>{venderName}</p>
        <p className={styles.description}>{data?.description}</p>

        <div className={styles.products}>
          {data?.products.map(product => (
            <div className={styles.product} key={product.id}>
              <p className={styles.category}>{product.category} 🎉</p>

              <ul className={styles.productItems}>
                {product.items.map(item => <ProductItem key={item.id} item={item} onSelectItem={handleSelectItem} />)}
              </ul>
            </div>
          ))}
        </div>
      </div>

      
      {!!selectedItem.item && (
        <Modal isOpen={!!selectedItem.item} onClose={onModalClose}>
          <ItemDetail 
            item={selectedItem}
            onAddToShoppingCart={handleAddToShoppingCart}
            onUpdateNote={updateNote}
            onUpdateCustomer={updateCustomer}
          />
        </Modal>
      )}
    </div>
  );
}
