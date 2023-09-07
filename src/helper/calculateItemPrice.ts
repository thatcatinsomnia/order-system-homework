import type { PickedItem } from '../stores/usePickedItemStore';
import type { OrderItem } from '../stores/useShoppingCartStore';

// free price is used to display text "FREE" when price is -1
// do not calculate -1 in the total price
// this is just for test purpose
const FREE_PRICE = -1;

export default function calculateItemPrice(item: PickedItem | OrderItem) {
  if (!item.item) {
    return 0;
  }

  const basePrice = item.item.price;

  const variantsTotalPrice = item.item.variants.reduce((total, variant) => {
    if (variant.type === 'radio' && variant.price !== FREE_PRICE) {
      total += variant.price;
    }

    if (variant.type === 'checkbox' && variant.isChecked) {
      total += variant.price
    }

    return total;
  }, 0);

  return (basePrice + variantsTotalPrice) * item.quantity;
}
