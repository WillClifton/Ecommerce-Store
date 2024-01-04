import { createSlice } from "@reduxjs/toolkit";

const toggleProfile = createSlice({
  name: "toggleProfile",
  initialState: false,
  reducers: {
    setToggleProfile: (state) => {
      return !state;
    },
  },
});

export const { setToggleProfile } = toggleProfile.actions;

export default toggleProfile.reducer;
