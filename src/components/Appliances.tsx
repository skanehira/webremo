import Box from "@mui/material/Box";
import { type Appliance } from "nature-remo";
import CustomCard from "./CustomCard";
import LightbulbOutlinedIcon from "@mui/icons-material/LightbulbOutlined";
import TvOutlinedIcon from "@mui/icons-material/TvOutlined";
import AdUnitsOutlinedIcon from "@mui/icons-material/AdUnitsOutlined";
import HeatPumpOutlinedIcon from "@mui/icons-material/HeatPumpOutlined"; // AirCon
import { useEffect, useRef, useState } from "react";
import { getAppliances } from "../apis/client";

function getIcon(appType: string) {
  switch (appType) {
    case "LIGHT":
      return <LightbulbOutlinedIcon />;
    case "TV":
      return <TvOutlinedIcon />;
    case "AC":
      return <HeatPumpOutlinedIcon />;
    default:
      return <AdUnitsOutlinedIcon />;
  }
}

export default function Appliances() {
  const [apps, setApps] = useState<Appliance[]>([]);

  const once = useRef(false);
  useEffect(() => {
    if (import.meta.env.MODE === "development") {
      if (once.current) {
        return;
      }
      once.current = true;
    }
    (async () => {
      const apps = await getAppliances();
      setApps(apps);
    })();
  }, []);

  return (
    <Box sx={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
      {apps.map((app) => {
        return (
          <CustomCard
            key={app.id}
            icon={getIcon(app.type)}
            title={app.nickname}
            subTitle={app.type}
            onClick={() => {
              // TODO: open detail windows
              console.log("clicked");
            }}
          />
        );
      })}
    </Box>
  );
}
