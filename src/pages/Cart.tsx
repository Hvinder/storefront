import React from "react";
import { useNavigate } from "react-router-dom";

import NavBar from "@/components/NavBar";
import ProductCardSkeleton from "@/components/ProductCardSkeleton";
import {
  fetchCart,
  selectCart,
  selectProductsLoading,
} from "@/redux/features/storeSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { CART_ID } from "@/config";
import CartItem from "@/components/CartItem";

const Cart: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const allProducts = useAppSelector(selectCart);
  const allProductsLoading = useAppSelector(selectProductsLoading);

  React.useEffect(() => {
    dispatch(fetchCart(CART_ID));
  }, [dispatch]);

  return (
    <div
      className="flex flex-col absolute top-0 w-full items-center"
      style={{ background: "hsl(var(--background))" }}
    >
      <NavBar />
      <div className="flex flex-wrap flex-col gap-4 justify-center items-center py-2.5 w-[1200px]">
        {allProductsLoading ? (
          [...Array(12)].map((_el, i) => <ProductCardSkeleton key={i} />)
        ) : allProducts.length ? (
          allProducts.map((product) => (
            <CartItem product={product} key={product.id} />
          ))
        ) : (
          <div className="flex flex-col items-center gap-10 pt-10">
            <Label>Cart is empty</Label>
            <Button onClick={() => navigate("/")}>Start shopping</Button>
          </div>
        )}
      </div>
      {allProducts.length ? (
        <div className="flex flex-col items-center gap-4 pt-10">
          <Button onClick={() => dispatch(fetchCart("800"))}>
            Empty cart?
          </Button>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Cart;
