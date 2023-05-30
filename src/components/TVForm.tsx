import { Button, Grid } from "@mui/material";
import { type TV } from "nature-remo";
import { useCallback } from "react";
import { sendButton } from "../apis/tv";

type Props = {
  id: string;
  tv: TV;
};

export default function TVForm({ id, tv }: Props) {
  const handleSendButton = useCallback(
    (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      const button = event.currentTarget.innerText;
      sendButton(id, button);
    },
    [id]
  );

  return (
    <>
      {tv.buttons.map((button) => (
        <Grid item xs={6} key={button.name}>
          <Button variant="contained" onClick={handleSendButton}>
            {button.name}
          </Button>
        </Grid>
      ))}
    </>
  );
}
