import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";

import { Toaster } from "@/components/ui/toaster";

import "./index.css";
import Login from "./pages/Login.tsx";
import Dashboard from "./pages/Dashboard.tsx";
import { store } from "./redux/store.ts";
import ProtectedRoute from "./lib/ProtectedRoute.tsx";

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
    element: <Dashboard />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      {/* <div className="container flex flex-col items-center p-4 bg-white m-0 h-full shadow-xl"> */}
      <RouterProvider router={router} />
      <Toaster />
      {/* </div> */}
    </Provider>
  </React.StrictMode>
);
