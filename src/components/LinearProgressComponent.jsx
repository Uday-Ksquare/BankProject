import { LinearProgress, TableCell, TableRow } from "@mui/material";
import React from "react";

const LinearProgressComponent = () => {
  return (
    <TableRow>
      <TableCell colSpan={200} sx={{ padding: 0 }}>
        <LinearProgress sx={{ width: "100%", margin: "10px 0" }} />
      </TableCell>
    </TableRow>
  );
};

export default LinearProgressComponent;
