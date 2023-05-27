import Box from "@mui/material/Box";
import { type Appliance } from "nature-remo";
import CustomCard from "./CustomCard";
import LightbulbOutlinedIcon from "@mui/icons-material/LightbulbOutlined";
import TvOutlinedIcon from "@mui/icons-material/TvOutlined";
import AdUnitsOutlinedIcon from "@mui/icons-material/AdUnitsOutlined";
import HeatPumpOutlinedIcon from "@mui/icons-material/HeatPumpOutlined"; // AirCon
import { useEffect, useRef, useState } from "react";
import { getAppliances } from "../apis/client";
import { useDispatch } from "react-redux";
import { setLoading } from "../stores/loader";

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
  const dispatch = useDispatch();

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
      dispatch(setLoading(true));
      const apps = await getAppliances();
      // 擬似的にローディングを再現するため
      setTimeout(() => {
        setApps(apps);
        dispatch(setLoading(false));
      }, 1000);
    })();
  }, [dispatch]);

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
