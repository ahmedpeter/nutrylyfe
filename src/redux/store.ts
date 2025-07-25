import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userSlice from "./user/userSlice.ts";
import cartReducer from "./user/cartSlice.ts";
import userDetailSlice from "./user/userDetailSlice.ts";
import storageSession from "reduxjs-toolkit-persist/lib/storage/session";
import { persistReducer, persistStore } from "redux-persist";
// import programSlice from "./program/programSlice.ts";
import storage from 'redux-persist/lib/storage'

const persistConfig = {
  key: "root",
  storage,
};
const rootReducer = combineReducers({
  user: userSlice,
  cart: cartReducer,
  // program:programSlice
});
const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore({
  reducer: persistedReducer,
});
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
