import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface UserState {
  user: {
    fname: string;
    lname: string;
    mname: string;
    email: string;
    package_id: string;
    user_type: string;
    my_ref_id: string;
    token: string;
    isLoggedIn: boolean;
  };
  unread?: number;
}

const initialState: UserState = {
  user: {
    fname: "",
    lname: "",
    email: "",
    package_id: "",
    user_type: "",
    my_ref_id: "",
    token: "",
    isLoggedIn: false,
  },
  unread: 0,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState>) => {
      state.user = action.payload.user;
    },
    setUnread: (state, action) => {
      state.unread = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUser, setUnread } = userSlice.actions;

export default userSlice.reducer;
