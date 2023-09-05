import type { Item, Option } from '../../hooks/useVenderProducts';
import type { VariantRadio } from "../../hooks/useVenderProducts";
import { RadioGroup } from '@headlessui/react';
import useSelectedItemStore, { updateVariants } from "../../stores/usePickedItemStore";
import styles from './radioVariant.module.css';

type Props = {
  variant: VariantRadio;
};

export default function RadioVariant({ variant }: Props) {
  const item = useSelectedItemStore(state => state.item as Item);
  
  const handleRadioChange = (value: string) => {
    const updatedVariants = item.variants.map(v => {
      if (v.type === 'radio' && v.id === variant.id) {
        return {
          ...v,
          selected: value
        };
      }

      return {...v};
    });

    updateVariants(updatedVariants);
  };

  return (
    <>
      <p className={styles.variantName}>
        {variant.name}
        <span className={styles.variantPrice}>{variant.price === -1 ? 'FREE' : `$${variant.price}`}</span>
      </p>
      <RadioGroup name={variant.name} onChange={handleRadioChange} defaultValue={variant.selected || ''}>
        {variant.options.map(option => <Option key={option.value} option={option} />)}
      </RadioGroup>
    </>
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