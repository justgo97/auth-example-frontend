import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface authState {
  name?: string;
  email?: string;
  nickname?: string;
  rank?: number;
}

const initialState: authState = {};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<authState>) => {
      const { name, email, nickname, rank } = action.payload;

      state.name = name;
      state.email = email;
      state.nickname = nickname;
      state.rank = rank;
    },
    logout: (state) => {
      state.name = undefined;
      state.email = undefined;
      state.nickname = undefined;
      state.rank = undefined;
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
