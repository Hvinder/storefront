import React from "react";
import { useParams } from "react-router-dom";

import NavBar from "@/components/NavBar";
import useProductDetails from "@/hooks/useProductDetails";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import StarRating from "@/components/StarRating";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { BASE_URL, USER_ID } from "@/config";
import { LoadingSpinner } from "@/components/Loader";

const ProductPage: React.FC = () => {
  const { productId = "1" } = useParams();
  const { productDetails: product, productDetailsLoading } = useProductDetails(
    +productId
  );
  const [loading, setLoading] = React.useState(false);

  // TODO: this could be a hook
  const handleAddToCart = async () => {
    try {
      setLoading(true);
      await axios.post(`${BASE_URL}/carts`, {
        userId: USER_ID,
        products: [
          {
            productId: product?.id,
            quantity: 1,
          },
        ],
      });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="flex flex-col absolute top-0 w-full items-center"
      style={{ background: "hsl(var(--background))" }}
    >
      <NavBar />
      <>
        {!product || productDetailsLoading ? (
          <LoadingSpinner size={150} className="mt-24" />
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
              <Button onClick={handleAddToCart}>
                {loading ? (
                  <LoadingSpinner />
                ) : (
                  `Add to cart - $${product.price}`
                )}
              </Button>
            </div>
          </div>
        )}
      </>
    </div>
  );
};

export default ProductPage;
