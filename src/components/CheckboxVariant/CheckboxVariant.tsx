import type { Item, Variant } from '../../hooks/useVenderProducts';
import type { VariantCheckbox } from '../../hooks/useVenderProducts';
import { FiCheck } from 'react-icons/fi';
import { Switch } from '@headlessui/react';
import usePickedItemStore, { updateVariants } from '../../stores/usePickedItemStore';
import styles from './checkboxVariant.module.css';

type Props = {
  variant: VariantCheckbox;
};

function findExistVariant(item: Item | null, variantId: number) {
  if (!item) {
    return null;
  }

  return item.variants.find(v => (v.id === variantId)) as VariantCheckbox;
}

function isCheckedFoundVariant(foundVariant: VariantCheckbox | null) {
  if (!foundVariant) {
    return false;
  }

  return foundVariant.isChecked || false;
}

export default function CheckboxVariant({ variant }: Props) {
  const item = usePickedItemStore(state => state.item);

  const foundVariant = findExistVariant(item, variant.id);

  const isChecked = isCheckedFoundVariant(foundVariant);

  const handleCheckboxChange = (checked: boolean) => {
    const updatedVariants = item?.variants.map(v => {
      if (v.id === variant.id && variant.type === 'checkbox') {
        return {
          ...v,
          isChecked: checked
        }
      }

      return v;
    });

    updateVariants(updatedVariants as Variant[]);
  }

  return (
    <Switch.Group>
      <Switch.Label className={styles.checkboxLabel}>
        <Switch
          className={`${styles.checkboxRectangle} ${isChecked ? styles.checked : ''}`}
          checked={isChecked}
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
