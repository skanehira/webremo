import { Button, Grid } from "@mui/material";
import { Signal } from "nature-remo";

type Props = {
  signals: Signal[];
};

export default function IRForm({ signals }: Props) {
  return (
    <>
      {signals.map((signal) => (
        <Grid item xs={6} key={signal.id}>
          <Button variant="contained">{signal.name}</Button>
        </Grid>
      ))}
    </>
  );
}
