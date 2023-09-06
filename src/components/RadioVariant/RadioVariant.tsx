import type { Item, Option } from '../../hooks/useVenderProducts';
import type { VariantRadio } from "../../hooks/useVenderProducts";
import { useRef, useEffect } from 'react';
import { FiAlertCircle } from 'react-icons/fi';
import { RadioGroup } from '@headlessui/react';
import useSelectedItemStore, { updateVariants } from "../../stores/usePickedItemStore";
import { setInputRef, setError } from '../../stores/useInputErrorStore';
import useInputErrorStore from '../../stores/useInputErrorStore';
import styles from './radioVariant.module.css';

type Props = {
  variant: VariantRadio;
};

export default function RadioVariant({ variant }: Props) {
  const ref = useRef<HTMLElement>(null);
  const item = useSelectedItemStore(state => state.item as Item);
  const errors = useInputErrorStore(state => state.errors);

  useEffect(() => {
    if(ref.current) {
      setInputRef(variant.name, ref.current);
    }
  }, []);

  const handleRadioChange = (name: string, value: string) => {
    const updatedVariants = item.variants.map(v => {
      if (v.type === 'radio' && v.id === variant.id && v.name === variant.name) {
        return {
          ...v,
          selected: value
        };
      }

      return {...v};
    });

    updateVariants(updatedVariants);

    if (errors[name] && errors[name]?.key) {
      setError(name, null);
    }
  };

  const variantError = errors?.[variant.name];

  return (
    <>
      <div className={styles.variantName}>
        <span>
          {variant.name}
          {variantError?.key && <small className={`${styles.errorMessage} animate-text-shake`}><FiAlertCircle />{variantError.message}</small>}
        </span>
        <span className={styles.variantPrice}>{variant.price === -1 ? 'FREE' : `$${variant.price}`}</span>
      </div>
      <RadioGroup
        id={variant.name}
        name={variant.name}
        onChange={(value: string) => handleRadioChange(variant.name, value)}
        defaultValue={variant.selected || ''}
        ref={ref}
      >
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