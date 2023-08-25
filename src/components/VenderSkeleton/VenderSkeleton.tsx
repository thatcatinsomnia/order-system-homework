import styles from './venderSkeleton.module.css';

export default function VenderSkeleton() {
  return (
    <div className="animate-skeleton">
      <div className={styles.imgSkeleton}></div>
      <p className={styles.nameSkeleton}></p>
    </div>
  );
}
