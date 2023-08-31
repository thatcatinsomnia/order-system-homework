import Layout from '../components/Layout';
import useShoppingCartStore from '../stores/useShoppingCartStore';

export default function ShoppingCart() {
  const cart = useShoppingCartStore(state => state.cart);

  return (
    <Layout>
      <p>page shopping cart</p>
      <code>{JSON.stringify(cart, null, 2)}</code>
    </Layout>
  );
}