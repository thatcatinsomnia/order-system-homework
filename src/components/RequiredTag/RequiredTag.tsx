import type { ReactNode } from 'react';
import styles from './requireTag.module.css';

type Props = {
  children: ReactNode;
};

export default function RequiredTag({ children }: Props) {
  return (
    <div className={styles.wrapper}>
      {children}
      <span className={styles.required}>required</span>
    </div>
  );
}
