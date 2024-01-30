import React from "react";
import { useNavigate, useParams } from "react-router-dom";

import NavBar from "@/components/NavBar";
import useProductDetails from "@/hooks/useProductDetails";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import StarRating from "@/components/StarRating";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { BASE_URL, USER_ID } from "@/config";
import { LoadingSpinner } from "@/components/Loader";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";

const ProductPage: React.FC = () => {
  const { productId = "1" } = useParams();
  const { toast } = useToast();
  const navigate = useNavigate();
  const { productDetails: product, productDetailsLoading } = useProductDetails(
    +productId
  );
  const [loading, setLoading] = React.useState(false);
  const [quantity, setQuantity] = React.useState(1);

  // TODO: this could be a hook
  const handleAddToCart = async () => {
    if (quantity < 1 || quantity > 10) {
      toast({
        description: "Quantity should be between 1 and 10",
        variant: "destructive",
      });
      return;
    }
    try {
      setLoading(true);
      await axios.post(`${BASE_URL}/carts`, {
        userId: USER_ID,
        products: [
          {
            productId: product?.id,
            quantity,
          },
        ],
      });
      toast({
        description: "Added to cart",
        action: (
          <ToastAction altText="Try again" onClick={() => navigate("/cart")}>
            Go to cart
          </ToastAction>
        ),
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
              <div className="flex gap-2">
                <Input
                  type="number"
                  value={quantity}
                  onChange={(ev) => setQuantity(+ev.target.value)}
                  className="w-1/4"
                />
                <Button onClick={handleAddToCart} className="w-3/4">
                  {loading ? (
                    <LoadingSpinner />
                  ) : (
                    `Add to cart - $${product.price}`
                  )}
                </Button>
              </div>
            </div>
          </div>
        )}
      </>
    </div>
  );
};

export default ProductPage;
