import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

import { RootState } from "../store";
import { BASE_URL, CART_ID } from "@/config";
import Product, { Cart, CartData } from "@/types/product";
import LOCALSTORAGE_KEYS from "@/config/storage";

export interface StoreState {
  products: Product[];
  productsLoading: boolean;
  cart: Cart[];
  cartData: CartData[];
  accessToken?: string | null;
}

const initialState: StoreState = {
  products: [],
  productsLoading: false,
  cart: [],
  cartData: [],
  accessToken: localStorage.getItem(LOCALSTORAGE_KEYS.ACCESS_TOKEN),
};

export const storeSlice = createSlice({
  name: "store",
  initialState,
  reducers: {
    setAccessToken: (state, action: PayloadAction<string | undefined>) => {
      state.accessToken = action.payload;
      if (action.payload) {
        localStorage.setItem(LOCALSTORAGE_KEYS.ACCESS_TOKEN, action.payload);
      } else {
        localStorage.removeItem(LOCALSTORAGE_KEYS.ACCESS_TOKEN);
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAllProducts.pending, (state) => {
      // state.products = [];
      state.productsLoading = true;
    });
    builder.addCase(fetchAllProducts.fulfilled, (state, action) => {
      state.products = action.payload;
      state.productsLoading = false;
    });
    builder.addCase(fetchAllProducts.rejected, (state) => {
      state.products = [];
      state.productsLoading = false;
    });
    builder.addCase(fetchCart.pending, (state) => {
      state.productsLoading = true;
    });
    builder.addCase(fetchCart.fulfilled, (state, action) => {
      state.cart = action.payload.cart;
      state.cartData = action.payload.cartData;
      state.productsLoading = false;
    });
    builder.addCase(fetchCart.rejected, (state) => {
      state.cart = [];
      state.productsLoading = false;
    });
  },
});

export const fetchAllProducts = createAsyncThunk(
  "products/fetchAll",
  async () => {
    const response = await axios.get<Product[]>(`${BASE_URL}/products`);
    return response.data;
  }
);
export const fetchCart = createAsyncThunk("products/fetchCart", async () => {
  const response = await axios.get<{ products: Cart[] }>(
    `${BASE_URL}/carts/${CART_ID}`
  );
  const cart = response.data?.products || [];
  const cartData = await Promise.all(
    cart.map(async (c) => {
      const id = c.productId;
      const res = await axios.get<Product>(`${BASE_URL}/products/${id}`);
      return { ...res.data, quantity: c.quantity };
    })
  );
  return { cart, cartData };
});

export const { setAccessToken } = storeSlice.actions;

export const selectAllProducts = (state: RootState) => state.store.products;
export const selectProductById = (productId: number) => (state: RootState) =>
  state.store.products.find((p) => p.id === productId);
export const selectProductsLoading = (state: RootState) =>
  state.store.productsLoading;
export const selectCart = (state: RootState) => state.store.cartData;
export const selectAccessToken = (state: RootState) => state.store.accessToken;

export default storeSlice.reducer;
