import { Button, Grid } from "@mui/material";
import { type Light } from "nature-remo";

type Props = {
  light: Light;
};

export default function LightForm({ light }: Props) {
  return (
    <>
      {light.buttons.map((button) => (
        <Grid item xs={6} key={button.name}>
          <Button variant="contained">{button.name}</Button>
        </Grid>
      ))}
    </>
  );
}
