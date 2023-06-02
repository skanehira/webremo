import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface Progress {
  loading: boolean;
}

const initialState: Progress = {
  loading: false,
};

export const progressSlice = createSlice({
  name: "progress",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const { setLoading } = progressSlice.actions;
export default progressSlice.reducer;
