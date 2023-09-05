import type { Item } from '../../hooks/useVenderProducts';
import type { VariantCheckbox } from '../../hooks/useVenderProducts';
import { FiCheck } from 'react-icons/fi';
import { Switch } from '@headlessui/react';
import usePickedItemStore, { updateVariants } from '../../stores/usePickedItemStore';
import styles from './checkboxVariant.module.css';

type Props = {
  variant: VariantCheckbox;
};

export default function CheckboxVariant({ variant }: Props) {
  // console.log(variant)
  const item = usePickedItemStore(state => state.item as Item);

  const foundVariant = item.variants.find(v => (v.id === variant.id)) as VariantCheckbox;
  
  const { isChecked } = foundVariant;

  const handleCheckboxChange = (checked: boolean) => {
    const updatedVariants = item.variants.map(v => {
      if (v.id === variant.id && variant.type === 'checkbox') {
        return {
          ...v,
          isChecked: checked
        }
      }

      return v;
    });

    updateVariants(updatedVariants);
  }

  return (
    <Switch.Group>
      <Switch.Label className={styles.checkboxLabel}>
        <Switch 
          className={`${styles.checkboxRectangle} ${isChecked ? styles.checked : ''}`}
          checked={isChecked || false}
          onChange={handleCheckboxChange}
        >
          {isChecked && <FiCheck />}
        </Switch>
        {variant.name}
        <span className={styles.variantPrice}>{variant.price === -1 ? 'FREE' : `$${variant.price}`}</span>
      </Switch.Label>
    </Switch.Group>
  );
}
