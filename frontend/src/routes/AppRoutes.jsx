import { Routes, Route, Navigate } from "react-router-dom";

import Login from "../pages/auth/Login";
import Signup from "../pages/auth/Signup";

import ProductList from "../pages/products/ProductList";
import ProductCreate from "../pages/products/ProductCreate";
import ProductDetail from "../pages/products/ProductDetail";
import ProductEdit from "../pages/products/ProductEdit";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/products" replace />} />

      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      <Route path="/products" element={<ProductList />} />

      <Route
        path="/products/new"
        element={
          <ProtectedRoute>
            <ProductCreate />
          </ProtectedRoute>
        }
      />

      <Route
        path="/products/:id/edit"
        element={
          <ProtectedRoute>
            <ProductEdit />
          </ProtectedRoute>
        }
      />

      <Route path="/products/:id" element={<ProductDetail />} />

      <Route
        path="*"
        element={<Navigate to="/products" replace />}
      />
    </Routes>
  );
}

export default AppRoutes;
