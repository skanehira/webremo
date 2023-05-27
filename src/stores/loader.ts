import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface LoadState {
  loading: boolean;
}

const initialState: LoadState = {
  loading: false,
};

export const loadSlice = createSlice({
  name: "load",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const { setLoading } = loadSlice.actions;
export default loadSlice.reducer;
