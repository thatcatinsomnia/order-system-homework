import type { SelectedItem } from '../../stores/useSelectedItemStore';
import { FiPlus, FiMinus } from 'react-icons/fi';
import calculateItemPrice from '../../../helper/calculateItemPrice';
import { increaseQuantity, decreaseQuantity } from '../../stores/useSelectedItemStore';
import ProductVariants from '../ProductVariants';
import RequiredTag from '../RequiredTag';
import styles from './itemDetail.module.css';

type Props = {
  item: SelectedItem;
  onAddToShoppingCart?: () => void;
  onUpdateCustomer: (customer: string) => void;
  onUpdateNote: (note: string) => void;
};

export default function ItemDetail({ item, onAddToShoppingCart, onUpdateCustomer, onUpdateNote }: Props) {
  const totalPrice = calculateItemPrice(item);

  return (
    <div className={styles.modalWrapper}>
      <div className={styles.modalImgBox}>
        <div className={styles.modalBackdrop} />
        <img className={styles.modalImg} src="https://loremflickr.com/800/600/drinks,meals" alt={item.item?.name} />
      </div>

      <div className={styles.modalHeader}>
        <p className={styles.modalTitle}>{item.item?.name}</p>
        <span className={styles.modalItemPrice}>${totalPrice}</span>
      </div>

      <div className={styles.modalBody}>
        {item.item?.variants.map(variant => (
          <ProductVariants key={variant.id} variant={variant} />
        ))}

        <label className={styles.modalLabel}>
          <span>備註</span>
          <textarea rows={4} value={item.note} onChange={e => onUpdateNote(e.target.value)} />
        </label>

        <label className={styles.modalLabel}>
          <RequiredTag>
            <span>訂購人</span>
          </RequiredTag>
          <input value={item.customer} onChange={e => onUpdateCustomer(e.target.value)} />
        </label>
      </div>
      
      <div className={styles.modalCTA}>
        <div className={styles.modalQuantityBox}>
          <button className={styles.modalQuantityButton} onClick={decreaseQuantity}>
            <FiMinus />
          </button>
          <span className={styles.modalQuantity}>{item.quantity}</span>
          <button className={styles.modalQuantityButton} onClick={increaseQuantity}>
            <FiPlus />
          </button>
        </div>
        <button 
          className={styles.modalSubmitButton}
          onClick={onAddToShoppingCart}
        >
          加到購物車
        </button>
      </div>
    </div>
  );
}