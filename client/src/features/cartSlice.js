import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: [],
  reducers: {
    setCart: (state, action) => {
      return action.payload;
    },
    addCartItem: (state, action) => {
      const newCartItem = action.payload;
      return [...state, newCartItem];
    },
    updateItemQuantity: (state, action) => {
      const id = action.payload;
      const targetItem = state.find((item) => item.id === id);

      if (targetItem) {
        targetItem.quantity += 1;
      }
    },
    deleteCartItem: (state, action) => {
      const id = action.payload;

      const newCartItems = state.filter((item) => item.id !== id);

      return newCartItems;
    },
    increaseCartQuantity: (state, action) => {
      const id = action.payload;

      const targetItem = state.find((item) => item.id === id);

      if (targetItem) {
        targetItem.quantity += 1;
      }
    },
    decreaseCartQuantity: (state, action) => {
      const id = action.payload;

      const targetItem = state.find((item) => item.id === id);

      if (targetItem) {
        targetItem.quantity -= 1;
      }
    },
  },
});

export const {
  setCart,
  addCartItem,
  updateItemQuantity,
  deleteCartItem,
  increaseCartQuantity,
  decreaseCartQuantity,
} = cartSlice.actions;

export default cartSlice.reducer;
