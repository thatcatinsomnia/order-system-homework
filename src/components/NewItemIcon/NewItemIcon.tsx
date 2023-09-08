import { forwardRef } from "react";
import { FiGift } from "react-icons/fi";
import styles from './newItem.module.css';

const NewItemIcon = forwardRef<HTMLDivElement>((_, ref) => {
  return (
    <div className={styles.wrapper} ref={ref}>
      <FiGift />
    </div>
  )
});

export default NewItemIcon;
