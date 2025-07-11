import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";


export interface UserDetailState {
  personalDetails?: {
    name?: string;
    email?: string;
    dob?: string;
    package?: string;
    userType?: string;
    acctName?: string;
    acctNumber?: string;
    acctType?: string;
    bank?: string;
    ref?: string;
    phone?:string;
    lga?: string;
    address?: string;
    state?: string;
    city?:string;
    password?:string;
    _id?:string;
  };
  wallet?: {
    balance?: string;
    pv?: string;
  };
  referrals?: {}[];
}

const initialState: UserDetailState = {
  personalDetails: {},
  wallet: {},
  referrals: [],
};

export const loginSlice = createSlice({
  name: "userDetails",
  initialState,
  reducers: {
    setPersonalDetails: (state, action: PayloadAction<UserDetailState>) => {
      state.personalDetails = action.payload.personalDetails;
    },
    setWallet: (state, action: PayloadAction<UserDetailState>) => {
      state.wallet = action.payload.wallet;
    },
    setReferrals: (
      state,
      action: PayloadAction<UserDetailState>
    ) => {
      state.referrals = action.payload.referrals;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setPersonalDetails,
  setWallet,
  setReferrals,
} = loginSlice.actions;

export default loginSlice.reducer;
