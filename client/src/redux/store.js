import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "../features/productsSlice";
import toggleCartReducer from "../features/toggleCart";
import cartReducer from "../features/cartSlice";
import authReducer from "../features/authSlice";
import toggleProfileReducer from "../features/toggleProfile";

const store = configureStore({
  reducer: {
    products: productsReducer,
    toggleCart: toggleCartReducer,
    cart: cartReducer,
    auth: authReducer,
    toggleProfile: toggleProfileReducer,
  },
});

export default store;
