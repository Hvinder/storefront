import React from "react";
import axios from "axios";

import { BASE_URL } from "@/config";
import { selectProductById } from "@/redux/features/storeSlice";
import { useAppSelector } from "@/redux/hooks";
import Product from "@/types/product";

const useProductDetails = (productId: number) => {
  const data = useAppSelector(selectProductById(+productId));
  const [productDetails, setProductDetails] = React.useState<Product>();
  const [productDetailsLoading, setProductDetailsLoading] =
    React.useState(false);

  const fetchProductDetails = async (productId: number) => {
    try {
      setProductDetailsLoading(true);
      const response = await axios.get<Product>(
        `${BASE_URL}/products/${productId}`
      );
      setProductDetails(response.data);
    } catch (err) {
      console.error(err);
    } finally {
      setProductDetailsLoading(false);
    }
  };

  React.useEffect(() => {
    if (!data) {
      fetchProductDetails(productId);
    }
  }, [data, productId]);

  return { productDetails: data || productDetails, productDetailsLoading };
};

export default useProductDetails;
