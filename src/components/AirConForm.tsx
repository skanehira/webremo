import {
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import type { AirconModeType, Appliance } from "nature-remo";
import { AppState, updateAirconSettings } from "../stores/apps";
import { useDispatch, useSelector } from "react-redux";
import {
  toUpdateSettings,
  updateAirconSettings as updateAircon,
} from "../apis/aircon";

type Props = {
  id: string;
};

export default function AirConForm({ id }: Props) {
  const dispatch = useDispatch();

  const app = useSelector<{ app: AppState }, Appliance | undefined>((state) => {
    if (state.app.selectedId) {
      return state.app.apps.find((app) => app.id === state.app.selectedId);
    }
  });

  if (!app) {
    return null;
  }

  const aircon = app.aircon!;
  const settings = app.settings!;
  const mode = settings.mode;

  const handlePower = (event: SelectChangeEvent) => {
    const value = event.target.value as string;
    let button = ""; // empty is power on
    if (value !== "ON") {
      button = "power-off";
    }
    // NOTE: clone settings because settings is immutable
    const newSettings = { ...settings, button };
    updateAircon(id, toUpdateSettings(newSettings)).then(() => {
      dispatch(updateAirconSettings({ id, settings: newSettings }));
    });
  };

  const handleMode = (event: SelectChangeEvent) => {
    const mode = event.target.value as AirconModeType;
    const newSettings = { ...settings, mode };
    updateAircon(id, toUpdateSettings(newSettings)).then(() => {
      dispatch(updateAirconSettings({ id, settings: newSettings }));
    });
  };

  const handleDirection = (event: SelectChangeEvent) => {
    const dir = event.target.value as string;
    const newSettings = { ...settings, dir };
    updateAircon(id, toUpdateSettings(newSettings)).then(() => {
      dispatch(updateAirconSettings({ id, settings: newSettings }));
    });
  };

  const hanldeTemp = (event: SelectChangeEvent) => {
    const temp = event.target.value as string;
    const newSettings = { ...settings, temp };
    updateAircon(id, toUpdateSettings(newSettings)).then(() => {
      dispatch(updateAirconSettings({ id, settings: newSettings }));
    });
  };

  const hanldeVolume = (event: SelectChangeEvent) => {
    const vol = event.target.value as string;
    const newSettings = { ...settings, vol };
    updateAircon(id, toUpdateSettings(newSettings)).then(() => {
      dispatch(updateAirconSettings({ id, settings: newSettings }));
    });
  };

  return (
    <>
      <Grid item xs={6}>
        <InputLabel id="power">Power</InputLabel>
        <Select
          labelId="power"
          id="power"
          value={settings.button === "" ? "ON" : "OFF"}
          label="Power"
          onChange={handlePower}
        >
          <MenuItem value={"ON"}>ON</MenuItem>
          <MenuItem value={"OFF"}>OFF</MenuItem>
        </Select>
      </Grid>

      <Grid item xs={6}>
        <InputLabel id="modes">Modes</InputLabel>
        <Select
          labelId="modes"
          id="modes"
          value={mode}
          label="Modes"
          onChange={handleMode}
        >
          {Object.keys(aircon.range.modes).map((key) => {
            return (
              <MenuItem key={key} value={key}>
                {key}
              </MenuItem>
            );
          })}
        </Select>
      </Grid>

      <Grid item xs={6}>
        <InputLabel id="directions">Direction</InputLabel>
        <Select
          labelId="directions"
          id="directions"
          value={settings.dir}
          label="Modes"
          onChange={handleDirection}
        >
          {aircon.range.modes[mode].dir.map((dir, index) => {
            return (
              <MenuItem key={index} value={dir}>
                {dir}
              </MenuItem>
            );
          })}
        </Select>
      </Grid>

      {(mode === "cool" || mode === "warm" || mode === "dry") && (
        <Grid item xs={6}>
          <InputLabel id="temps">Temp</InputLabel>
          <Select
            labelId="temps"
            id="temps"
            value={settings.temp}
            label="Temperatures"
            onChange={hanldeTemp}
          >
            {aircon.range.modes[mode].temp.map((temp, index) => {
              return (
                <MenuItem key={index} value={temp}>
                  {temp}
                </MenuItem>
              );
            })}
          </Select>
        </Grid>
      )}

      {(mode === "cool" || mode === "warm" || mode === "blow") && (
        <Grid item xs={6}>
          <InputLabel id="volumes">Volume</InputLabel>
          <Select
            labelId="volumes"
            id="volumes"
            value={settings.vol}
            label="Volumes"
            onChange={hanldeVolume}
          >
            {aircon.range.modes[mode].vol.map((vol, index) => {
              return (
                <MenuItem key={index} value={vol}>
                  {vol}
                </MenuItem>
              );
            })}
          </Select>
        </Grid>
      )}
    </>
  );
}
