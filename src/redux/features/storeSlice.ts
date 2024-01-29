import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

import { RootState } from "../store";
import { BASE_URL } from "@/config";
import Product from "@/types/product";

export interface StoreState {
  products: Product[];
  productsLoading: boolean;
  cart: Product[];
}

const initialState: StoreState = {
  products: [],
  productsLoading: false,
  cart: [],
};

export const storeSlice = createSlice({
  name: "store",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      state.cart = [...state.cart, action.payload];
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
  },
});

export const fetchAllProducts = createAsyncThunk(
  "products/fetchAll",
  async () => {
    const response = await axios.get(`${BASE_URL}/products`);
    return response.data;
  }
);

// const fetchProductById = createAsyncThunk(
//   "products/fetchById",
//   async (productId: string) => {
//     const response = await axios.get(`${BASE_URL}/products/${productId}`);
//     return response.data;
//   }
// );

export const { addToCart } = storeSlice.actions;

export const selectAllProducts = (state: RootState) => state.store.products;
export const selectProductsLoading = (state: RootState) =>
  state.store.productsLoading;
export const selectCart = (state: RootState) => state.store.cart;

export default storeSlice.reducer;
