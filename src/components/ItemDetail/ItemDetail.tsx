import type { ChangeEvent } from 'react';
import type { PickedItem } from '../../stores/usePickedItemStore';
import { useRef, useEffect } from 'react';
import { FiPlus, FiMinus, FiAlertCircle } from 'react-icons/fi';
import { decrease, increase } from '../../stores/usePickedItemStore';
import useInputErrorStore, { addError, setError, clearErrors, setInputRef } from '../../stores/useInputErrorStore';
import validateVariants from '../../helper/validateVariants';
import calculateItemPrice from '../../helper/calculateItemPrice';
import scrollModalTo from '../../helper/scrollModalTo';
import ProductVariants from '../ProductVariants';
import styles from './itemDetail.module.css';

type Props = {
  item: PickedItem;
  onUpdateShoppingCart: () => void;
  onUpdateCustomer: (customer: string) => void;
  onUpdateNote: (note: string) => void;
  isEdit?: boolean;
};

export default function ItemDetail({ item, onUpdateShoppingCart, onUpdateNote, onUpdateCustomer, isEdit = false }: Props) {
  const totalPrice = calculateItemPrice(item);
  const errors = useInputErrorStore(state => state.errors);
  const inputRefs = useInputErrorStore(state => state.inputRefs);
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (ref.current) {
      setInputRef('customer', ref.current);
    }
  }, []);

  const handleUpdateShoppingCart = () => {
    let inputErrors = validateVariants(item.item!.variants);

    if (!item.customer) {
      inputErrors = {
        ...inputErrors,
        customer: {
          key: 'customer',
          message: 'Customer不可以空白'
        }
      }
    }

    if (Object.keys(inputErrors).length > 0) {
      addError(inputErrors);

      // scroll view to first error
      const firstErrorKey = Object.keys(inputErrors)[0];
      const firstErrorElement = inputRefs[firstErrorKey as keyof typeof inputRefs] as HTMLElement;
      scrollModalTo(firstErrorElement);

      return;
    }

    onUpdateShoppingCart();
    clearErrors();
  };

  const handleUpdateCustomer = (e: ChangeEvent<HTMLInputElement>) => {
    // user update the customer field, clear error state
    if (errors.customer && errors.customer.key) {
      setError('customer', null);
    }

    onUpdateCustomer(e.target.value);
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.imgBox}>
        <div className={styles.backdrop} />
        <img
          className={styles.img}
          src="https://loremflickr.com/800/600/drinks,meals" alt={item.item?.name}
          width={486}
          height={320}
        />
      </div>

      <div className={styles.header}>
        <p className={styles.title}>{item.item?.name}</p>
        <span className={styles.itemPrice}>${totalPrice}</span>
      </div>

      <div className={styles.body}>
        {item.item?.variants.map(variant => (
          <ProductVariants key={variant.id} variant={variant} />
        ))}

        <div className={styles.bodyGroup}>
          <label htmlFor="note" className={styles.label}>備註</label>
          <textarea id="note" className={styles.textarea} rows={4} value={item.note} onChange={e => onUpdateNote(e.target.value)} />
        </div>

        <div className={`${styles.bodyGroup}`}>
          <label htmlFor="customer" className={styles.label}>
            <span className={`${styles.customerSpan} ${styles.required}`}>訂購人</span>
            {errors.customer && <small className={`${styles.errorMessage} animate-text-shake`}><FiAlertCircle />{errors.customer.message}</small>}
          </label>
          <input
            id="customer"
            className={`${styles.input} ${errors.customer ? styles.isError : ''}`}
            value={item.customer}
            onChange={handleUpdateCustomer}
            ref={ref}
          />
        </div>
      </div>

      <div className={styles.cta}>
        <div className={styles.quantityBox}>
          <button className={styles.quantityButton} onClick={decrease}>
            <FiMinus />
          </button>
          <span className={styles.quantity}>{item.quantity}</span>
          <button className={styles.quantityButton} onClick={increase}>
            <FiPlus />
          </button>
        </div>
        <button
          className={styles.submitButton}
          onClick={handleUpdateShoppingCart}
        >
          { isEdit ? '更新購物車' : '加到購物車'}
        </button>
      </div>
    </div>
  );
}