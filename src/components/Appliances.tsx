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

type Props = {
  setIsLoading: (loading: boolean) => void;
};

export default function Appliances({ setIsLoading }: Props) {
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
      setIsLoading(true);
      const apps = await getAppliances();
      // 擬似的にローディングを再現するため
      setTimeout(() => {
        setApps(apps);
        setIsLoading(false);
      }, 1000);
    })();
  }, [setIsLoading]);

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
              // TODO: open form
              console.log("clicked");
            }}
          />
        );
      })}
    </Box>
  );
}
