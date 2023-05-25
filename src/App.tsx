import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import LightbulbOutlinedIcon from "@mui/icons-material/LightbulbOutlined";
import TvOutlinedIcon from "@mui/icons-material/TvOutlined";
import AdUnitsOutlinedIcon from "@mui/icons-material/AdUnitsOutlined";
import HeatPumpOutlinedIcon from "@mui/icons-material/HeatPumpOutlined"; // AirCon
import { getAppliances } from "./apis/client";
import { useEffect, useRef, useState } from "react";
import { Appliance } from "nature-remo";

function DeviceCard({ title, appType }: { title: string; appType: string }) {
  let icon = <AdUnitsOutlinedIcon />;

  switch (appType) {
    case "LIGHT":
      icon = <LightbulbOutlinedIcon />;
      break;
    case "TV":
      icon = <TvOutlinedIcon />;
      break;
    case "AC":
      icon = <HeatPumpOutlinedIcon />;
      break;
  }

  return (
    <Card
      className="card"
      sx={{
        minWidth: 230,
        maxWidth: 230,
        m: 1,
        transition: "0.3s",
        "&:hover": {
          boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)",
          border: "1px solid rgba(0, 0, 0, 0.3)",
        },
      }}
      onClick={() => {
        console.log("todo: implement");
      }}
    >
      <CardHeader avatar={icon} title={title} subheader={appType} />
    </Card>
  );
}

export default function App() {
  const [apps, setApps] = useState([] as Appliance[]);

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

  const navItems = ["About"];

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar component="nav">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            WebRemo
          </Typography>
          <Box>
            {navItems.map((item) => (
              <Button key={item} sx={{ color: "#fff" }}>
                {item}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
      <Box component="main" sx={{ p: 3 }}>
        <Toolbar />
        <Box sx={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
          {apps.map((app) => {
            return (
              <DeviceCard
                key={app.id}
                title={app.nickname}
                appType={app.type}
              />
            );
          })}
        </Box>
      </Box>
    </Box>
  );
}
