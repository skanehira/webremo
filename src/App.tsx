import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import { getAppliances } from "./apis/client";
import { useEffect, useRef, useState } from "react";
import { type Appliance } from "nature-remo";
import Appliances from "./components/Appliances";

export default function App() {
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

  const navItems = ["Device", "Appliance"];

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
        <Appliances apps={apps} />
      </Box>
    </Box>
  );
}
