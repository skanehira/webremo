import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useSelector } from "react-redux";
import { AppState } from "../stores/apps";
import { type Appliance } from "nature-remo";
import TVForm from "./TVForm";
import LightForm from "./LightForm";
import AirConForm from "./AirConForm";
import IRForm from "./IRForm";
import { Grid } from "@mui/material";

type Props = {
  id: string;
  open: boolean;
  setOpen: (open: boolean) => void;
};

export default function CardForm({ id, open, setOpen }: Props) {
  const app = useSelector<{ app: AppState }, Appliance | undefined>((state) => {
    if (id) {
      return state.app.apps.find((app) => app.id === id);
    }
  });

  if (!app) {
    return null;
  }

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{app.nickname}</DialogTitle>
        <DialogContent>
          <Grid container spacing={{ xs: 1 }} columns={{ xs: 12 }}>
            {app.tv && <TVForm id={app.id} tv={app.tv} />}
            {app.light && <LightForm id={app.id} light={app.light} />}
            {app.aircon && app.settings && <AirConForm id={app.id} />}
            {app.signals && <IRForm signals={app.signals} />}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
