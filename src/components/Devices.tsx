import Box from "@mui/material/Box";
import { type Device } from "nature-remo";
import CustomCard from "./CustomCard";
import { useEffect, useRef, useState } from "react";
import { getDevices } from "../apis/client";

export default function Devices() {
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
      const devices = await getDevices();
      setDevices(devices);
    })();
  });

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
