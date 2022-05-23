import * as React from "react";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";

export default function LinearIndeterminate() {
  return (
    <Box sx={{ width: "80%", margin: "10px auto" }}>
      <LinearProgress />
    </Box>
  );
}
