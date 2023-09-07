import type { Vender as VenderType } from '../../hooks/useVenders';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import styles from './vender.module.css';

type Props = {
  vender: VenderType;
}

export default function Vender({ vender }: Props) {
  return (
    <Link
      className={styles.vender}
      to={`/venders/${vender.id}/products`}
      state={{ vender: vender.name }}
    >
      <motion.div
        className={styles.imgBox}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, bounce: 0 }}
      >
        <img src={vender.image} alt={vender.name} />
      </motion.div>
      <p>{vender.name}</p>
    </Link>
  );
}
