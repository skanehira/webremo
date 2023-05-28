import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { type Device } from "nature-remo";

export interface DeviceState {
  devices: Device[];
  selectedId?: string;
}

const initialState: DeviceState = {
  devices: [],
};

export const deviceSlice = createSlice({
  name: "device",
  initialState,
  reducers: {
    setDevices: (state, action: PayloadAction<Device[]>) => {
      state.devices = action.payload;
    },
    selectDevice: (state, action: PayloadAction<string>) => {
      const app = state.devices.find((app) => app.id === action.payload);
      if (app) {
        state.selectedId = app.id;
      }
    },
  },
});

export const { setDevices, selectDevice } = deviceSlice.actions;
export default deviceSlice.reducer;
