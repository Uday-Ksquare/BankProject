import { Paper, Typography } from "@mui/material";
import React from "react";

const TableHeadingCard = ({ headingOne, headingTwo ,SubHeading}) => {
  return (
    <Paper
      sx={{
        p: 2,
        bgcolor: "#FFFFFF",
        borderRadius: "10px",
        textAlign: "center",
      }}
    >
      <Typography variant="h6">
        {headingOne}
      </Typography>
      <Typography variant="body2">
        {SubHeading}
      </Typography>
    </Paper>
  );
};

export default TableHeadingCard;
