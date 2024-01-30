type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: Rating;
};

export type Rating = {
  rate: number;
  count: number;
};

export type Cart = {
  productId: number;
  quantity: number;
};

export type CartData = Product & { quantity: number };

export default Product;
