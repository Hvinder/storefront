import React from "react";
import { useParams } from "react-router-dom";

import NavBar from "@/components/NavBar";
import useProductDetails from "@/hooks/useProductDetails";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import StarRating from "@/components/StarRating";
import { Button } from "@/components/ui/button";
import { useAppDispatch } from "@/redux/hooks";
import { addToCart } from "@/redux/features/storeSlice";

const ProductPage: React.FC = () => {
  const { productId = "1" } = useParams();
  const dispatch = useAppDispatch();
  const { productDetails: product, productDetailsLoading } = useProductDetails(
    +productId
  );

  const handleAddToCart = () => {
    dispatch(addToCart(product!));
  };

  return (
    <div
      className="flex flex-col absolute top-0 w-full items-center"
      style={{ background: "hsl(var(--background))" }}
    >
      <NavBar />
      <>
        {!product || productDetailsLoading ? (
          <></>
        ) : (
          <div className="flex flex-wrap gap-4 justify-center pt-12 p-6 w-[1200px]">
            <div className="w-2/5">
              <div
                className="w-80 h-80"
                style={{
                  background: `url("${product.image}")`,
                  backgroundSize: "cover",
                }}
              />
            </div>
            <div className="flex flex-col w-2/5 gap-4">
              <Label className="font-extrabold text-2xl">{product.title}</Label>
              <Badge className="w-fit cursor-pointer">{product.category}</Badge>
              <StarRating rating={product.rating} />
              <Label>{product.description}</Label>
              <Button
                onClick={handleAddToCart}
              >{`Add to cart - $${product.price}`}</Button>
            </div>
          </div>
        )}
      </>
    </div>
  );
};

export default ProductPage;
