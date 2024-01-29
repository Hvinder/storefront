import ProductCard from "@/components/ProductCard";
import {
  fetchAllProducts,
  selectAllProducts,
} from "@/redux/features/storeSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import React from "react";

const Dashboard: React.FC = () => {
  const dispatch = useAppDispatch();
  const allProducts = useAppSelector(selectAllProducts);

  React.useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  return (
    <div className="flex flex-wrap gap-4 justify-center">
      {allProducts.map((product) => (
        <ProductCard product={product} key={product.id} />
      ))}
    </div>
  );
};

export default Dashboard;
