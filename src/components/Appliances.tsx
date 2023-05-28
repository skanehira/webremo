import { type Appliance } from "nature-remo";
import { useEffect, useRef } from "react";
import { getAppliances } from "../apis/client";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../stores/loader";
import { AppState, setApps } from "../stores/apps";
import ApplianceCard from "./ApplianceCard";
import { Box } from "@mui/material";

export default function Appliances() {
  const apps = useSelector<{ app: AppState }, Appliance[]>((state) => {
    return state.app.apps;
  });
  const dispatch = useDispatch();

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
      {apps.map((app) => (
        <ApplianceCard key={app.id} app={app} />
      ))}
    </Box>
  );
}
