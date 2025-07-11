import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";


export interface UserDetailState {
  personalDetails?: {
    fname?: string;
    lname?: string;
    email?: string;
    dob?: string;
    package_id?: string;
    user_ype?: string;
    acctName?: string;
    acctNumber?: string;
    acctType?: string;
    bank?: string;
    my_ref_id?: string;
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
