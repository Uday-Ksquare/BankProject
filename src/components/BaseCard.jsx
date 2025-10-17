import { Box, Typography } from "@mui/material";
import React from "react";
import xlsxIcon from "../assets/Icon_XLSX.svg";

const BaseCard = ({ screen_description, screen_name }) => {
  return (
    <Box
      sx={{
        border: "1px solid rgba(0, 0, 0, 0.1)",
        padding: "15px",
        borderRadius: "10px",
        borderLeft: "10px solid rgba(61, 188, 209, 1)",
        width: "320px",
        backgroundColor: "white",
      }}
    >
      <img src={xlsxIcon} />
      <Typography gutterBottom sx={{ fontWeight: "bold" }}>
        {screen_name}
      </Typography>
      <Typography>
        {screen_description}
        {/* Gather key documents, links, and transcripts in one place. */}
      </Typography>
      {/* <Typography>{screen_name}</Typography> */}
    </Box>
  );
};

export default BaseCard;
