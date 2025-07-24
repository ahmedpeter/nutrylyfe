// redux/cart/cartSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cart: [], 
  };

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action) => {
      const itemExists = state.cart.find(item => item.id === action.payload.id);
      if (!itemExists) {
        state.cart.push({ ...action.payload, quantity: 1 });
      }
    },
    incrementItem: (state, action) => {
      const item = state.cart.find(item => item.id === action.payload);
      if (item) item.quantity += 1;
    },
    decrementItem: (state, action) => {
      const item = state.cart.find(item => item.id === action.payload);
      if (item && item.quantity > 1) item.quantity -= 1;
    },
    removeItem: (state, action) => {
      state.cart = state.cart.filter(item => item.id !== action.payload);
    },
    clearCart: (state) => {
      state.cart = [];
    },
  },
});

export const {
  addItem,
  removeItem,
  incrementItem,
  decrementItem,
  clearCart,
} = cartSlice.actions;

export const selectCart = (state) => state.cart;

export default cartSlice.reducer;
