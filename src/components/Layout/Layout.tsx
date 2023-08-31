import type { ReactNode } from "react";
import Header from '../Header';
import styles from './layout.module.css';

type Props = {
  children: ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <div className={styles.layout}>
      <Header />
      {children}
    </div>
  );
}
