import { Navigate, Route, Routes } from 'react-router-dom';
import { CartPage } from '../../features/cart/CartPage';
import { CatalogPage } from '../../features/catalog/CatalogPage';
import { AppLayout } from '../../features/layout/AppLayout';
import { OrdersPage } from '../../features/orders/OrdersPage';

export const AppRouter = () => {
  return (
    <AppLayout>
      <Routes>
        <Route path="/" element={<CatalogPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/orders" element={<OrdersPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AppLayout>
  );
};
