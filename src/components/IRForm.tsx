import { Button, Grid } from "@mui/material";
import { Signal } from "nature-remo";
import { sendSignal } from "../apis/signal";

type Props = {
  signals: Signal[];
};

export default function IRForm({ signals }: Props) {
  return (
    <>
      {signals.map((signal) => (
        <Grid item xs={6} key={signal.id}>
          <Button variant="contained" onClick={() => sendSignal(signal.id)}>
            {signal.name}
          </Button>
        </Grid>
      ))}
    </>
  );
}
