import type { ChangeEvent } from 'react';
import type { PickedItem } from '../../stores/usePickedItemStore';
import { useRef, useEffect } from 'react';
import { motion, useSpring } from 'framer-motion';
import { FiPlus, FiMinus, FiAlertCircle, FiShoppingCart } from 'react-icons/fi';
import { PiShoppingBagFill } from 'react-icons/pi';
import { decrease, increase } from '../../stores/usePickedItemStore';
import useInputErrorStore, { addError, setError, clearErrors, setInputRef } from '../../stores/useInputErrorStore';
import validateVariants from '../../helper/validateVariants';
import calculateItemPrice from '../../helper/calculateItemPrice';
import scrollModalTo from '../../helper/scrollModalTo';
import ProductVariants from '../ProductVariants';
import styles from './itemDetail.module.css';
import { setFromIcon } from '../../stores/useFlyIconStore';

type Props = {
  item: PickedItem;
  onUpdateShoppingCart: () => void;
  onUpdateCustomer: (customer: string) => void;
  onUpdateNote: (note: string) => void;
  isEdit?: boolean;
};

export default function ItemDetail({ item, onUpdateShoppingCart, onUpdateNote, onUpdateCustomer, isEdit = false }: Props) {
  const totalPriceRef = useRef<HTMLSpanElement>(null);
  const totalPrice = calculateItemPrice(item);

  // framer-motion animate  numbers
  const spring = useSpring(totalPrice, { bounce: 0 });

  const errors = useInputErrorStore(state => state.errors);
  const inputRefs = useInputErrorStore(state => state.inputRefs);
  
  const ref = useRef<HTMLInputElement>(null);
  const flyIconRef = useRef<HTMLDivElement>(null);
  const submitRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (ref.current) {
      setInputRef('customer', ref.current);
    }
  }, []);

  useEffect(() => {
    spring.on('change', (latest: number) => {
      if (totalPriceRef.current) {
        totalPriceRef.current.textContent = `$${latest.toFixed(0)}`
      }
    });

    spring.set(totalPrice);

    return () => spring.clearListeners();
  }, [totalPrice]);

  useEffect(() => {
    if (!flyIconRef.current) {
      return;
    }

    setFromIcon(flyIconRef.current);
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
    <div className={styles.wrapper} id="wrapper">
      <div className={styles.content}>
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
          <motion.span className={styles.itemPrice} ref={totalPriceRef}>${totalPrice}</motion.span>
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
          <div className={styles.submitBtnContainer}>
            <button
              className={styles.submitButton}
              onClick={handleUpdateShoppingCart}
              type="button"
              id="submit-btn"
              ref={submitRef}
            >
              {isEdit && '更新購物車'}
              {!isEdit && (
                <>
                  <span>加到購物車</span>
                  <FiShoppingCart />
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      <div ref={flyIconRef} className={styles.flyShoppingCart} id="fly-shopping-cart">
        <PiShoppingBagFill />
      </div>
    </div>
  );
}