import { useAppSelector } from "@/redux/hooks";
import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const accessToken = useAppSelector((state) => state.store.accessToken);

  if (!accessToken) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default ProtectedRoute;
