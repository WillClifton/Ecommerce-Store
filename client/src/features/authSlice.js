import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: [{ id: "", message: "" }],
  reducers: {
    setSignedUp: (state, action) => {
      const data = { id: "signedup", message: action.payload };
      return [data];
    },
    setUser: (state, action) => {
      // Check if the user is already added/exists in state
      const existingUser = state.find(
        (user) => user._id === action.payload._id
      );

      if (existingUser) {
        return state;
      } else {
        const newState = [...state, action.payload];
        return newState;
      }
    },
  },
});

export const { setSignedUp, setUser } = authSlice.actions;

export default authSlice.reducer;
