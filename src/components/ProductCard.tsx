import React from "react";
import { useNavigate } from "react-router-dom";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";

import Product from "@/types/product";
import StarRating from "./StarRating";

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const navigate = useNavigate();

  return (
    <Card
      className="w-[300px] cursor-pointer hover:scale-105 transition-all duration-200 ease-in"
      onClick={() => navigate(`/product/${product.id}`)}
    >
      <CardHeader>
        <CardTitle className="truncate whitespace-nowrap">
          {product.title}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex justify-center">
        <div
          style={{
            width: "150px",
            height: "150px",
            background: `url("${product.image}")`,
            backgroundSize: "cover",
          }}
        />
      </CardContent>
      <CardFooter className="flex justify-between">
        <Label>${product.price}</Label>
        <StarRating rating={product.rating} />
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
