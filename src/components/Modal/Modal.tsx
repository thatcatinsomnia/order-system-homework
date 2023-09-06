import type { ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Dialog } from '@headlessui/react';
import { FiX } from 'react-icons/fi';
import styles from './modal.module.css';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
};

const MotionPanel = motion(Dialog.Panel);
// the headlessui version 1.7.17 will close the dialog when you click on panel at fresh reload
// use 1.7.14 to prevent the problem
export default function Modal({ isOpen, onClose, children }: Props) {
  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <div>
          <Dialog
            as="div"
            open={isOpen}
            onClose={onClose}
            className={styles.dialog}
          >
            {/* using dedicated element to create overlay */}
            <motion.div
              className={styles.overlay}
              aria-hidden="true"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { delay: 0.2 } }}
            />

            <div className={styles.scrollable} id="modal-srcollable-container">
              <div className={styles.center}>
                <MotionPanel
                  as="div"
                  className={styles.panel}
                  initial={{ y: 66, opacity: 0 }}
                  animate={{ y: 0, opacity: 1, transition: { delay: 0.1 } }}
                  exit={{ y: 66, opacity: 0 }}
                >
                  {children}
                  <button
                    className={styles.close}
                    onClick={onClose}
                  >
                    <FiX />
                  </button>
                </MotionPanel>
              </div>
            </div>
          </Dialog>
        </div>
      )}
    </AnimatePresence>
  );
}
