import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { AirconSettingsWithTimestamp, type Appliance } from "nature-remo";

export type UpdateAirconPayload = {
  id: string;
  settings: AirconSettingsWithTimestamp;
};

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
    updateAirconSettings: (
      state,
      action: PayloadAction<UpdateAirconPayload>
    ) => {
      const idx = state.apps.findIndex((app) => app.id === action.payload.id);
      state.apps[idx].settings = action.payload.settings;
    },
  },
});

export const { setApps, selectApp, updateAirconSettings } = appSlice.actions;
export default appSlice.reducer;
