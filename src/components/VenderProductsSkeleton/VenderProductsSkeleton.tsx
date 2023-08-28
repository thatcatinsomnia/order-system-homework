import type { ReactNode } from 'react';
import styles from './venderProductsSkeleton.module.css';

export default function VenderProductsSkeleton() {
  return (
    <div className={`${styles.skeleton} animate-skeleton`}>
      <div className={styles.img}></div>

      <Content>
        <p className={styles.name}></p>

        <div className={styles.description}>
          <DescriptionRow />
          <DescriptionRow />
          <DescriptionRow />
          <DescriptionRow isLastRow />
        </div>

        <div className={styles.categories}>
          <CategorySkeleton count={4} />
          <CategorySkeleton />
        </div>
      </Content>
    </div>
  );
}

function Content({ children }: { children: ReactNode }) {
  return (
    <div className={styles.content}>{children}</div>
  );
}

function DescriptionRow({ isLastRow }: { isLastRow?: boolean }) {
  return (
    <p 
      className={styles.descriptionRow}
      style={isLastRow ? { maxWidth: `33%` } : undefined }
    />
  );
}

type CountProps = {
  count?: number;
}

function CategorySkeleton({ count = 6 }: CountProps) {
  return (
    <div className={styles.category}>
      <p className={styles.categoryTitle} />
      <ProductListSkeleton count={count} />
    </div>
  );
}

type RequiredCount = Required<CountProps>;

function ProductListSkeleton({ count }: RequiredCount) {
  return (
    <ul className={styles.products}>
      {Array.from({ length: count }).map((_, i) => <ProductSkeleton key={i} />)}
    </ul>
  );
}

function ProductSkeleton() {
  return  <li className={styles.product} />;
}
