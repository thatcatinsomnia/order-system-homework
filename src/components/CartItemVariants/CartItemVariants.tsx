import type { Variant } from '../../hooks/useVenderProducts';
import styles from './cartItemVariants.module.css';

type Props = {
  variants: Variant[]
};

export default function CartItemVariants({ variants }: Props) {
  const variantsText = variants.map(variant => {
    if (variant.type === 'checkbox') {
      return variant.checked ? variant.name : '';
    }

    return variant.selected;
  })
  
  return (
    <p className={styles.variants}>{variantsText.join('; ')}</p>
  );
}