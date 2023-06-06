import Box from "@mui/material/Box";
import { type Device } from "nature-remo";
import CustomCard from "./CustomCard";
import { useEffect, useRef } from "react";
import { getDevices } from "../apis/device";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../stores/progress";
import { DeviceState, setDevices } from "../stores/devices";

export default function Devices() {
  const dispatch = useDispatch();

  const devices = useSelector<{ device: DeviceState }, Device[]>((state) => {
    return state.device.devices;
  });

  const once = useRef(false);
  useEffect(() => {
    if (devices.length > 0) {
      return;
    }
    if (import.meta.env.MODE === "development") {
      if (once.current) {
        return;
      }
      once.current = true;
    }
    (async () => {
      dispatch(setLoading(true));
      try {
        const devices = await getDevices();
        dispatch(setDevices(devices));
      } finally {
        dispatch(setLoading(false));
      }
    })();
  }, [dispatch, devices]);

  return (
    <Box sx={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
      {devices.map((dev) => {
        return (
          <CustomCard
            key={dev.id}
            title={dev.name}
            subTitle={dev.firmware_version}
            onClick={() => {
              // TODO: open form
            }}
          />
        );
      })}
    </Box>
  );
}
