import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { Toaster } from "@/components/ui/toaster";

import App from "./App.tsx";
import "./index.css";
import Login from "./pages/Login.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    {/* <div className="container flex flex-col items-center p-4 bg-white m-0 h-full shadow-xl"> */}
    <RouterProvider router={router} />
    <Toaster />
    {/* </div> */}
  </React.StrictMode>
);
