import type { Variant } from '../../hooks/useVenderProducts';
import RadioVariant from '../RadioVariant';
import CheckboxVariant from '../CheckboxVariant';
import styles from './productVariants.module.css';

type Props = {
  variant: Variant;
};

export default function ProductVariants({ variant }: Props) {
  if (variant.type === 'radio') {
    return (
      <div className={styles.wrapper} id={variant.name}>
        <RadioVariant variant={variant} />
      </div>
    )
  }

  return (
    <div className={styles.wrapper}>
      <CheckboxVariant variant={variant} />
    </div>
  );
}
