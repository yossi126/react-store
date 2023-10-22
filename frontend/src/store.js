import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./features/cartSilce";
export const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});
