import Box from "@mui/material/Box";
import { type Device } from "nature-remo";
import CustomCard from "./CustomCard";
import { useEffect, useRef, useState } from "react";
import { getDevices } from "../apis/client";
import { useDispatch } from "react-redux";
import { setLoading } from "../stores/loader";

export default function Devices() {
  const dispatch = useDispatch();

  const [devices, setDevices] = useState<Device[]>([]);

  const once = useRef(false);
  useEffect(() => {
    if (import.meta.env.MODE === "development") {
      if (once.current) {
        return;
      }
      once.current = true;
    }
    (async () => {
      dispatch(setLoading(true));
      const devices = await getDevices();
      setTimeout(() => {
        dispatch(setLoading(false));
        setDevices(devices);
      }, 1000);
    })();
  }, [dispatch]);

  return (
    <Box sx={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
      {devices.map((dev) => {
        return (
          <CustomCard
            key={dev.id}
            title={dev.name}
            subTitle={dev.firmware_version}
          />
        );
      })}
    </Box>
  );
}
