import { createBrowserRouter } from "react-router-dom";

import ProtectedRoute from "@/lib/ProtectedRoute";
import Dashboard from "@/pages/Dashboard";
import Login from "@/pages/Login";
import ProductPage from "@/pages/ProductPage";
import Cart from "@/pages/Cart";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Dashboard />,
      </ProtectedRoute>
    ),
  },
  {
    path: "/product/:productId",
    element: (
      <ProtectedRoute>
        <ProductPage />,
      </ProtectedRoute>
    ),
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/cart",
    element: (
      <ProtectedRoute>
        <Cart />
      </ProtectedRoute>
    ),
  },
]);

export default router;
