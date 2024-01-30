import React from "react";
import { useNavigate } from "react-router-dom";

import { Card, CardTitle } from "@/components/ui/card";

import { CartData } from "@/types/product";
import StarRating from "./StarRating";

const CartItem: React.FC<{ product: CartData }> = ({ product }) => {
  const navigate = useNavigate();

  return (
    <Card
      className="w-[500px] h-[80px] cursor-pointer flex justify-center items-center gap-2"
      onClick={() => navigate(`/product/${product.id}`)}
    >
      <div
        style={{
          width: "50px",
          height: "50px",
          background: `url("${product.image}")`,
          backgroundSize: "cover",
        }}
      />
      <div className="w-4/5 flex flex-col gap-1">
        <CardTitle className="truncate whitespace-nowrap">
          {product.title}
        </CardTitle>
        <div className="flex w-full justify-between">
          <CardTitle className="font-normal">
            quantity - {product.quantity}
          </CardTitle>
          <StarRating rating={product.rating} />
        </div>
      </div>
    </Card>
  );
};

export default CartItem;
