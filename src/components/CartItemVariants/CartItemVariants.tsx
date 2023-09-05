import type { Variant } from '../../hooks/useVenderProducts';
import styles from './cartItemVariants.module.css';

type Props = {
  variants: Variant[]
};

export default function CartItemVariants({ variants }: Props) {
  const variantsText = variants.map(variant => {
    if (variant.type === 'checkbox') {
      return variant.isChecked ? variant.name : '';
    }

    return variant.selected;
  }).filter(text => text);
  
  return (
    <p className={styles.variants}>{variantsText.join('; ')}</p>
  );
}