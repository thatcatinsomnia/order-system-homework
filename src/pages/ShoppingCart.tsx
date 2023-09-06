import Layout from '../components/Layout';
import PageTransition from '../components/PageTransiton';
import ShoppingCartItems from '../components/ShoppingCartItems';

export default function ShoppingCart() {
  return (
    <Layout>
      <PageTransition>
        <ShoppingCartItems />
      </PageTransition>
    </Layout>
  );
}