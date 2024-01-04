import { createSlice } from "@reduxjs/toolkit";

const toggleCart = createSlice({
  name: "toggleCart",
  initialState: false,
  reducers: {
    setToggleCart: (state) => {
      return !state;
    },
  },
});

export const { setToggleCart } = toggleCart.actions;
export default toggleCart.reducer;
