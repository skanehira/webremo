import { Button, Grid } from "@mui/material";
import { type Light } from "nature-remo";
import { useCallback } from "react";
import { sendButton } from "../apis/light";

type Props = {
  id: string;
  light: Light;
};

export default function LightForm({ id, light }: Props) {
  const handleSendButton = useCallback(
    (button: string) => {
      sendButton(id, button);
    },
    [id]
  );

  return (
    <>
      {light.buttons.map((button) => (
        <Grid item xs={6} key={button.name}>
          <Button
            variant="contained"
            onClick={() => {
              handleSendButton(button.name);
            }}
          >
            {button.name}
          </Button>
        </Grid>
      ))}
    </>
  );
}
