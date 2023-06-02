import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import { useSelector } from "react-redux";
import { Progress } from "../stores/progress";

export default function Progress() {
  const isLoading = useSelector<{ progress: Progress }, boolean>(
    (state) => state.progress.loading
  );

  return (
    <Box sx={{ width: "100%" }}>
      {isLoading ? <LinearProgress></LinearProgress> : null}
    </Box>
  );
}
