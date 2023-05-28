import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { type Appliance } from "nature-remo";

export interface AppState {
  apps: Appliance[];
  selectedId?: string;
}

const initialState: AppState = {
  apps: [],
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setApps: (state, action: PayloadAction<Appliance[]>) => {
      state.apps = action.payload;
    },
    selectApp: (state, action: PayloadAction<string>) => {
      const app = state.apps.find((app) => app.id === action.payload);
      if (app) {
        state.selectedId = app.id;
      }
    },
  },
});

export const { setApps, selectApp } = appSlice.actions;
export default appSlice.reducer;
