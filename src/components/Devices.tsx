import Box from "@mui/material/Box";
import { type Device } from "nature-remo";
import CustomCard from "./CustomCard";
import { useEffect, useRef, useState } from "react";
import { getDevices } from "../apis/client";

type Props = {
  setIsLoading: (loading: boolean) => void;
};

export default function Devices({ setIsLoading }: Props) {
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
      setIsLoading(true);
      const devices = await getDevices();
      setTimeout(() => {
        setIsLoading(false);
        setDevices(devices);
      }, 1000);
    })();
  }, [setIsLoading]);

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
