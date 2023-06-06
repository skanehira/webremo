import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { type Device } from "nature-remo";

export interface DeviceState {
  devices: Device[];
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
  },
});

export const { setDevices } = deviceSlice.actions;
export default deviceSlice.reducer;
