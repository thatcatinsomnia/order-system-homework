import type { Item } from '../../hooks/useVenderProducts';
import { useState, useRef, useMemo } from 'react';
import randomId from '../../../helper/randomId';
import useSelectedItemStore, { increaseQuantity, decreaseQuantity, setSelectedItem, resetSelectedItem } from '../../stores/useSelectedItemStore';
import { addToShoppingCart } from '../../stores/useShoppingCartStore';
import { FiPlus, FiMinus } from 'react-icons/fi';
import Modal from '../Modal/Modal';
import ProductVariants from '../ProductVariants';
import RequiredTag from '../RequiredTag/RequiredTag';
import styles from './productItem.module.css';

type Props = {
  item: Item;
  venderName: string;
};

export default function ProductItem({ item, venderName }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const customerRef = useRef<HTMLInputElement>(null);
  const noteRef = useRef<HTMLTextAreaElement>(null);

  const quantity = useSelectedItemStore(state => state.quantity);
  const selectedItem = useSelectedItemStore(state => state.item);
  
  const totalPrice = useMemo(() => {
    return selectedItem?.variants.reduce((total, v) => {
      if (v.type === 'checkbox' && !v.checked) {
        return total;
      }
      return v.price + total;
    }, selectedItem.price)
  }, [selectedItem]);

  const handleSelecteItem = () => {
    setSelectedItem(item);
    setIsOpen(true);
  };

  const onModalClose = () => {
    resetSelectedItem();
    setIsOpen(false);
  };

  const handleAddToShoppingCart = () => {
    if (!customerRef.current?.value) {
      // TODO: show alert - customer field is required.
      alert('please typing customer field.')
      return;
    }
    
    addToShoppingCart({
      id: randomId(),
      venderName: venderName,
      customer: customerRef.current.value,
      note: noteRef.current?.value || '',
      item: selectedItem as Item,
      quantity: quantity
    });

    onModalClose();
  }

  return (
    <>
      <li className={styles.item} onClick={handleSelecteItem}>
        <img 
          className={styles.itemImg}
          src={`https://loremflickr.com/100/100/drinks,meals`} 
        />

        <div className={styles.itemContent}>
          <p className={styles.itemName}>{item.name}</p>
          <p>$ {item.price}</p>
        </div>

        <button className={styles.itemPlusButton}>
          <FiPlus />
        </button>
      </li>

      {isOpen && (
        <Modal isOpen={isOpen} onClose={onModalClose}>
          <div className={styles.modalWrapper}>
            <div className={styles.modalImgBox}>
              <div className={styles.modalBackdrop} />
              <img className={styles.modalImg} src="https://loremflickr.com/800/600/drinks,meals" alt={item.name} />
            </div>

            <div className={styles.modalHeader}>
              <p className={styles.modalTitle}>{item.name}</p>
              <span className={styles.modalItemPrice}>${totalPrice ? totalPrice * quantity : item.price}</span>
            </div>

            <div className={styles.modalBody}>
              {item.variants.map(variant => (
                <ProductVariants key={variant.id} variant={variant} />
              ))}

              <label className={styles.modalLabel}>
                <span>備註</span>
                <textarea rows={4} ref={noteRef} />
              </label>

              <label className={styles.modalLabel}>
                <RequiredTag>
                  <span>訂購人</span>
                </RequiredTag>
                <input ref={customerRef} />
              </label>
            </div>
            
            <div className={styles.modalCTA}>
              <div className={styles.modalQuantityBox}>
                <button className={styles.modalQuantityButton} onClick={decreaseQuantity}>
                  <FiMinus />
                </button>
                <span className={styles.modalQuantity}>{quantity}</span>
                <button className={styles.modalQuantityButton} onClick={increaseQuantity}>
                  <FiPlus />
                </button>
              </div>
              <button 
                className={styles.modalSubmitButton}
                onClick={handleAddToShoppingCart}
              >
                加到購物車
              </button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}
