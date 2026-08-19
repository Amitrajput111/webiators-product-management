import { Routes, Route } from 'react-router-dom';

import Login from '../pages/auth/Login';
import Signup from '../pages/auth/Signup';

import ProductList from '../pages/products/ProductList';
import ProductCreate from '../pages/products/ProductCreate';
import ProductDetail from '../pages/products/ProductDetail';
import ProductEdit from '../pages/products/ProductEdit';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      <Route path="/products" element={<ProductList />} />
      <Route path="/products/new" element={<ProductCreate />} />
      <Route path="/products/:id" element={<ProductDetail />} />
      <Route path="/products/:id/edit" element={<ProductEdit />} />
    </Routes>
  );
}

export default AppRoutes;