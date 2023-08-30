import type { ReactNode } from 'react';
import { Dialog } from '@headlessui/react';
import { FiX } from 'react-icons/fi';
import styles from './modal.module.css';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
};

// the headlessui version 1.7.17 will close the dialog when you click on panel at fresh reload
// use 1.7.14 to prevent the problem
export default function Modal({ isOpen, onClose, children }: Props) {
  return (
    <Dialog 
      as="div"
      open={isOpen} 
      onClose={onClose}
      className={styles.dialog}
    >
      {/* using dedicated element to create overlay */}
      <div className={styles.overlay} aria-hidden="true" />

      <div className={styles.scrollable}>
        <div className={styles.center}>
          <Dialog.Panel className={styles.panel}>
            {children}
            <button
              className={styles.close}
              onClick={onClose}
            >
              <FiX />
            </button>
          </Dialog.Panel>
        </div>
      </div>
    </Dialog>
  );
}
