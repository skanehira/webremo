import Box from "@mui/material/Box";
import { type Appliance } from "nature-remo";
import CustomCard from "./CustomCard";
import LightbulbOutlinedIcon from "@mui/icons-material/LightbulbOutlined";
import TvOutlinedIcon from "@mui/icons-material/TvOutlined";
import AdUnitsOutlinedIcon from "@mui/icons-material/AdUnitsOutlined";
import HeatPumpOutlinedIcon from "@mui/icons-material/HeatPumpOutlined"; // AirCon
import { useEffect, useRef } from "react";
import { getAppliances } from "../apis/client";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../stores/loader";
import { AppState, setApps, selectApp } from "../stores/apps";

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
  const apps = useSelector<{ app: AppState }, Appliance[]>((state) => {
    return state.app.apps;
  });
  const dispatch = useDispatch();

  // TODO: refactor
  const once = useRef(false);
  useEffect(() => {
    if (apps.length > 0) {
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
      const apps = await getAppliances();
      dispatch(setApps(apps));
      dispatch(setLoading(false));
    })();
  }, [dispatch, apps]);

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
              dispatch(selectApp(app.id));
              // TODO: open form
            }}
          />
        );
      })}
    </Box>
  );
}
