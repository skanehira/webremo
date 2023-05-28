import { Button, Grid } from "@mui/material";
import { type TV } from "nature-remo";

type Props = {
  tv: TV;
};

export default function TVForm({ tv }: Props) {
  return (
    <>
      {tv.buttons.map((button) => (
        <Grid item xs={6} key={button.name}>
          <Button variant="contained">{button.name}</Button>
        </Grid>
      ))}
    </>
  );
}
