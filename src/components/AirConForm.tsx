import {
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import type {
  AirconSettingsWithTimestamp,
  Aircon,
  AirconModeType,
} from "nature-remo";
import { useState } from "react";

type Props = {
  aircon: Aircon;
  settings: AirconSettingsWithTimestamp;
};

export default function AirConForm({ aircon, settings }: Props) {
  // TODO: update value of store
  const [power, setPower] = useState("ON");
  const [mode, setMode] = useState(settings.mode);
  const [direction, setDirection] = useState(settings.dir);
  const [temp, setTemp] = useState(settings.temp);
  const [volume, setVolume] = useState(settings.vol);

  const modes = Object.entries(aircon.range.modes).map(([key, _value]) => {
    return (
      <MenuItem key={key} value={key}>
        {key}
      </MenuItem>
    );
  });

  const directions = aircon.range.modes[mode].dir.map((dir, index) => {
    return (
      <MenuItem key={index} value={dir}>
        {dir}
      </MenuItem>
    );
  });

  const temps = aircon.range.modes[mode].temp.map((temp, index) => {
    return (
      <MenuItem key={index} value={temp}>
        {temp}
      </MenuItem>
    );
  });

  const volumes = aircon.range.modes[mode].vol.map((vol, index) => {
    return (
      <MenuItem key={index} value={vol}>
        {vol}
      </MenuItem>
    );
  });

  const handlePower = (event: SelectChangeEvent) => {
    setPower(event.target.value as string);
  };

  const handleMode = (event: SelectChangeEvent) => {
    setMode(event.target.value as AirconModeType);
  };

  const handleDirection = (event: SelectChangeEvent) => {
    setDirection(event.target.value as string);
  };

  const hanldeTemp = (event: SelectChangeEvent) => {
    setTemp(event.target.value as string);
  };

  const hanldeVolume = (event: SelectChangeEvent) => {
    setVolume(event.target.value as string);
  };

  return (
    <>
      <Grid item xs={6}>
        <InputLabel id="power">Power</InputLabel>
        <Select
          labelId="power"
          id="power"
          value={power}
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
          {modes}
        </Select>
      </Grid>

      <Grid item xs={6}>
        <InputLabel id="directions">Direction</InputLabel>
        <Select
          labelId="directions"
          id="directions"
          value={direction}
          label="Modes"
          onChange={handleDirection}
        >
          {directions}
        </Select>
      </Grid>

      {mode === "cool" || mode === "warm" || mode === "dry" ? (
        <Grid item xs={6}>
          <InputLabel id="temps">Temp</InputLabel>
          <Select
            labelId="temps"
            id="temps"
            value={temp}
            label="Temperatures"
            onChange={hanldeTemp}
          >
            {temps}
          </Select>
        </Grid>
      ) : null}

      {mode === "cool" || mode === "warm" || mode === "blow" ? (
        <Grid item xs={6}>
          <InputLabel id="volumes">Volume</InputLabel>
          <Select
            labelId="volumes"
            id="volumes"
            value={volume}
            label="Volumes"
            onChange={hanldeVolume}
          >
            {volumes}
          </Select>
        </Grid>
      ) : null}
    </>
  );
}
