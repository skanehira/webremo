import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Appliances from "./components/Appliances";
import Devices from "./components/Devices";
import { Routes, Route, useNavigate } from "react-router-dom";
import NotFound from "./components/NotFound";
import LinearProgress from "@mui/material/LinearProgress";
import { useCallback, useState } from "react";

export default function App() {
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const navItems = [
    { name: "Appliances", path: "/" },
    { name: "Devices", path: "/devices" },
  ];

  const handleIsLoading = useCallback((loading: boolean) => {
    setIsLoading(loading);
  }, []);

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
              <Button
                key={item.name}
                sx={{ color: "#fff" }}
                onClick={() => {
                  navigate(item.path);
                }}
              >
                {item.name}
              </Button>
            ))}
          </Box>
        </Toolbar>
        <Box sx={{ width: "100%" }}>
          {isLoading ? <LinearProgress></LinearProgress> : null}
        </Box>
      </AppBar>
      <Box component="main" sx={{ p: 3 }}>
        <Toolbar />
        <Routes>
          <Route path="/">
            <Route
              path=""
              element={<Appliances setIsLoading={handleIsLoading} />}
            ></Route>
            <Route
              path="devices"
              element={<Devices setIsLoading={handleIsLoading} />}
            ></Route>
            <Route path="*" element={<NotFound />}></Route>
          </Route>
        </Routes>
      </Box>
    </Box>
  );
}
