import type { OrderItem } from '../src/stores/useShoppingCartStore';
import type { SelectedItem } from '../src/stores/useSelectedItemStore';

export default function calculateItemPrice(item: OrderItem | SelectedItem) {
  if (!item.item) {
    return 0;
  }
  
  const basePrice = item.item.price;

  const variantsTotalPrice = item.item.variants.reduce((total, variant) => {
    if (variant.type === 'radio') {
      total += variant.price;
    }

    if (variant.type === 'checkbox' && variant.checked) {
      total += variant.price
    }

    return total;
  }, 0);

  return (basePrice + variantsTotalPrice) * item.quantity;
}
