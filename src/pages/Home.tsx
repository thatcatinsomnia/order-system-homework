import Layout from '../components/Layout';
import PageTransition from '../components/PageTransiton';
import VenderList from '../components/VenderList/VenderList';

export default function Home() {
  return (
    <Layout>
      <PageTransition>
        <VenderList />
      </PageTransition>
    </Layout>
  );
}
