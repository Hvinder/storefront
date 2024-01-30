import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";

import { Toaster } from "@/components/ui/toaster";

import "./index.css";
import { store } from "./redux/store.ts";
import router from "./routes/router.tsx";

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
