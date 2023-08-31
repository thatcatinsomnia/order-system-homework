import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import Home from './pages/Home';
import Vender from './pages/Vender';
import ShoppingCart from './pages/ShoppingCart';
import './app.css';
import './globals.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/venders/:id/products',
    element: <Vender />
  },
  {
    path: '/shopping-cart',
    element: <ShoppingCart />
  },
]);

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}
