import type { PickedItem } from '../src/stores/usePickedItemStore';
import type { OrderItem } from '../src/stores/useShoppingCartStore';

export default function calculateItemPrice(item: PickedItem | OrderItem) {
  if (!item.item) {
    return 0;
  }
  
  const basePrice = item.item.price;

  const variantsTotalPrice = item.item.variants.reduce((total, variant) => {
    if (variant.type === 'radio') {
      total += variant.price;
    }

    if (variant.type === 'checkbox' && variant.isChecked) {
      total += variant.price
    }

    return total;
  }, 0);

  return (basePrice + variantsTotalPrice) * item.quantity;
}
