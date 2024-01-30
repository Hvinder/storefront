import NavBar from "@/components/NavBar";
import ProductCard from "@/components/ProductCard";
import ProductCardSkeleton from "@/components/ProductCardSkeleton";
import {
  fetchAllProducts,
  selectAllProducts,
  selectProductsLoading,
} from "@/redux/features/storeSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import React from "react";

const Dashboard: React.FC = () => {
  const dispatch = useAppDispatch();
  const allProducts = useAppSelector(selectAllProducts);
  const allProductsLoading = useAppSelector(selectProductsLoading);

  React.useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  return (
    <div
      className="flex flex-col absolute top-0 w-full items-center"
      style={{ background: "hsl(var(--background))" }}
    >
      <NavBar />
      <div className="flex flex-wrap gap-4 justify-center pt-2.5 w-[1200px]">
        {allProductsLoading
          ? [...Array(12)].map((_el, i) => <ProductCardSkeleton key={i} />)
          : allProducts.map((product) => (
              <ProductCard product={product} key={product.id} />
            ))}
      </div>
    </div>
  );
};

export default Dashboard;
