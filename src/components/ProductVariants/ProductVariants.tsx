import type { Variant, VariantRadio, VariantCheckbox, Option } from '../../hooks/useVenderProducts';
import { RadioGroup, Switch } from '@headlessui/react';
import { FiCheck } from 'react-icons/fi';
import useSelectedItemStore, { setSelectedItem } from '../../stores/useSelectedItemStore';
import styles from './productVariants.module.css';

type Props = {
  variant: Variant;
};

export default function ProductVariants({ variant }: Props) {
  if (variant.type === 'radio') {
    return <RadioVariant variant={variant} />
  }
  
  return (
    <div className={styles.wrapper}>
      <CheckboxVariant variant={variant} />
    </div>
  );
}

type RadioVariantProps = {
  variant: VariantRadio;
};

function RadioVariant({ variant }: RadioVariantProps) {
  const selectedItem = useSelectedItemStore(state => state.item);
  
  const handleRadioChange = (value: string) => {
    if (!selectedItem) {
      return;
    }

    const updatedVariants = selectedItem.variants.map(v => {
      if (v.type === 'radio' && v.id === variant.id) {
        v.selected = value;
      }

      return v;
    });

    setSelectedItem({
      ...selectedItem,
      variants: updatedVariants
    });
  };

  return (
    <div className={styles.wrapper}>
      <p className={styles.variantName}>
        {variant.name}
        <span className={styles.variantPrice}>{variant.price === -1 ? 'FREE' : `$${variant.price}`}</span>
      </p>
      <RadioGroup name={variant.name} onChange={handleRadioChange}>
        {variant.options.map(option => <Option key={option.value} option={option} />)}
      </RadioGroup>
    </div>
  );
}

type OptionProps = {
  option: Option;
};

function Option({ option }: OptionProps) {
  return (
    <RadioGroup.Option value={option.name}>
      {({ checked }) => (
        <div className={styles.option}>
          <RadioIcon checked={checked} />
          <RadioGroup.Label>{option.name}</RadioGroup.Label>
        </div>
      )}
    </RadioGroup.Option>
  );
}

type CheckboxVariantProps = {
  variant: VariantCheckbox;
};

function CheckboxVariant({ variant }: CheckboxVariantProps) {
  const selectedItem = useSelectedItemStore(state => state.item);

  const foundVariant = selectedItem?.variants.find(v => (v.id === variant.id)) as VariantCheckbox;
  const { checked } = foundVariant;

  const handleCheckboxChange = (checked: boolean) => {
    if (!selectedItem) {
      return;
    }

    const updatedVariants = selectedItem.variants.map(v => {
      if (v.type === variant.type && v.id === variant.id) {
        v.checked = checked;
      }

      return v;
    });

    setSelectedItem({
      ...selectedItem,
      variants: updatedVariants
    });
  }

  return (
    <Switch.Group>
      <Switch.Label className={styles.checkboxLabel}>
        <Switch 
          className={`${styles.checkboxRectangle} ${checked ? styles.checked : ''}`}
          checked={checked || false}
          onChange={handleCheckboxChange}
        >
          {checked && <FiCheck />}
        </Switch>
        {variant.name}
        <span className={styles.variantPrice}>{variant.price === -1 ? 'FREE' : `$${variant.price}`}</span>
      </Switch.Label>
    </Switch.Group>
  );
}

type RadioIconProps = {
  checked: boolean;
};

function RadioIcon({ checked }: RadioIconProps) {
  return (
    <div className={`${styles.radio} ${checked ? styles.checked : ''}`}></div>
  );
}
