import React from "react";
import { useNavigate } from "react-router-dom";

import NavBar from "@/components/NavBar";
import ProductCard from "@/components/ProductCard";
import ProductCardSkeleton from "@/components/ProductCardSkeleton";
import {
  fetchCart,
  selectCart,
  selectProductsLoading,
} from "@/redux/features/storeSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const Cart: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const allProducts = useAppSelector(selectCart);
  const allProductsLoading = useAppSelector(selectProductsLoading);

  React.useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  return (
    <div
      className="flex flex-col absolute top-0 w-full items-center"
      style={{ background: "hsl(var(--background))" }}
    >
      <NavBar />
      <div className="flex flex-wrap gap-4 justify-center py-2.5 w-[1200px]">
        {allProductsLoading ? (
          [...Array(12)].map((_el, i) => <ProductCardSkeleton key={i} />)
        ) : allProducts.length ? (
          allProducts.map((product) => (
            <ProductCard product={product} key={product.id} isCart />
          ))
        ) : (
          <div className="flex flex-col items-center gap-10 pt-10">
            <Label>Cart is empty</Label>
            <Button onClick={() => navigate("/")}>Start shopping</Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
