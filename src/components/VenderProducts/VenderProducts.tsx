import { useLocation } from 'react-router-dom';
import useVenderProducts from '../../hooks/useVenderProducts';
import VenderProductsSkeleton from '../VenderProductsSkeleton';
import FetchErrorMessage from '../FetchErrorMessage';
import ProductItem from '../ProductItem';
import styles from './venderProducts.module.css';

export default function VenderProducts() {
  // we need to match the vender name in detail page, 
  // don't do this in real world 
  const { state } = useLocation();
  const { venderName } = state;

  const { data, isLoading, isError, error } = useVenderProducts();

  if (isLoading) {
    return <VenderProductsSkeleton />;
  }

  if (isError) {
    return <FetchErrorMessage error={error} />
  }

  return (
    <div>
      <img
        className={styles.cover}
        src={data?.cover}
        alt={venderName}
      />

      <div className={styles.content}>
        <p className={styles.title}>{venderName}</p>
        <p className={styles.description}>{data?.description}</p>

        <div className={styles.products}>
          {data?.products.map(product => (
            <div className={styles.product} key={product.id}>
              <p className={styles.category}>{product.category} 🎉</p>

              <ul className={styles.productItems}>
                {product.items.map(item => <ProductItem key={item.id} item={item} />)}
              </ul>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
