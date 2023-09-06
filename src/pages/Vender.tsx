import Layout from '../components/Layout';
import PageTransition from '../components/PageTransiton';
import VenderProducts from '../components/VenderProducts';

export default function Vender() {
  return (
    <Layout>
      <PageTransition>
        <VenderProducts />
      </PageTransition>
    </Layout>
  );
}
