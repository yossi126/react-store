import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  cart: [],
  amount: 0,
  total: 0,
  isLoading: true,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearCart: (state) => {
      state.cart = [];
    },
    removeItem: (state, action) => {
      const itemId = action.payload;
      state.cartItems = state.cartItems.filter((item) => item.id !== itemId);
    },
    increase: (state, { payload }) => {
      const cartItem = state.products.find((item) => item.id === payload.id);
      cartItem.amount = cartItem.amount + 1;
      state.amount = state.amount + 1;
    },
    decrease: (state, { payload }) => {
      const cartItem = state.products.find((item) => item.id === payload.id);
      cartItem.amount = cartItem.amount - 1;
      state.amount = state.amount - 1;
    },
    calculateTotals: (state) => {
      let amount = 0;
      let total = 0;
      state.cartItems.forEach((item) => {
        amount += item.amount;
        total += item.amount * item.price;
      });
      state.amount = amount;
      state.total = total;
    },
    load: (state, payload) => {
      state.products = payload.payload;
    },
    addToCart: (state, action) => {
      state.cart.push(action.payload);
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const {
  clearCart,
  removeItem,
  increase,
  decrease,
  calculateTotals,
  load,
  addToCart,
  setIsLoading,
} = cartSlice.actions;

export default cartSlice.reducer;
