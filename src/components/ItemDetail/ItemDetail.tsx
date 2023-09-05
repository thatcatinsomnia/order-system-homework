import type { PickedItem } from '../../stores/usePickedItemStore';
import{ decrease, increase } from '../../stores/usePickedItemStore';
import { FiPlus, FiMinus } from 'react-icons/fi';
import calculateItemPrice from '../../../helper/calculateItemPrice';
import ProductVariants from '../ProductVariants';
import RequiredTag from '../RequiredTag';
import styles from './itemDetail.module.css';

type Props = {
  item: PickedItem;
  onUpdateShoppingCart?: () => void;
  onUpdateCustomer: (customer: string) => void;
  onUpdateNote: (note: string) => void;
  isEdit?: boolean;
};

export default function ItemDetail({ item, onUpdateShoppingCart, onUpdateNote, onUpdateCustomer, isEdit = false }: Props) {
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
          <button className={styles.modalQuantityButton} onClick={decrease}>
            <FiMinus />
          </button>
          <span className={styles.modalQuantity}>{item.quantity}</span>
          <button className={styles.modalQuantityButton} onClick={increase}>
            <FiPlus />
          </button>
        </div>
        <button
          className={styles.modalSubmitButton}
          onClick={onUpdateShoppingCart}
        >
          { isEdit ? '更新購物車' : '加到購物車'}
        </button>
      </div>
    </div>
  );
}