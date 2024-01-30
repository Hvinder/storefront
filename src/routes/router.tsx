import { createBrowserRouter } from "react-router-dom";

import ProtectedRoute from "@/lib/ProtectedRoute";
import Dashboard from "@/pages/Dashboard";
import Login from "@/pages/Login";
import ProductPage from "@/pages/ProductPage";

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
    element: <ProductPage />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

export default router;
