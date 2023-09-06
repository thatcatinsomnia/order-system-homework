import type { ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type Props = {
  children: ReactNode;
};

export default function PageTransition({ children }: Props) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.88 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
