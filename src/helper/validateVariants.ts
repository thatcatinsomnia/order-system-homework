import type { Errors } from '../stores/useInputErrorStore';
import { Variant } from '../hooks/useVenderProducts';

export default function validateVariants(variants: Variant[]) {
  const erorrs: Errors = {};

  for (let v of variants) {
    if (v.type === 'radio' && v.isRequired && !v.selected) {
      const variantName = v.name;

      erorrs[variantName] = {
        key: v.name,
        message: `${v.name}不可以空白`
      };
    }
  }

  return erorrs;
}
