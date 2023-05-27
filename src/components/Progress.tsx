import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import { useSelector } from "react-redux";
import { LoadState } from "../stores/loader";

export default function Progress() {
  const isLoading = useSelector<{ load: LoadState }, boolean>(
    (state) => state.load.loading
  );

  return (
    <Box sx={{ width: "100%" }}>
      {isLoading ? <LinearProgress></LinearProgress> : null}
    </Box>
  );
}
