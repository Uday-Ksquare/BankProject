import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import ksquareLogo from "../assets/ksquaredarklogo.svg";
import pageNotFoundImg from "../assets/NotFound.svg";

const PageNotFound = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        justifyContent: "center",
        alignItems: "center",
        height: "90vh",
        width: "95vw",
        bgcolor: "#f9fafb",
        p: 3,
      }}
    >
      {/* Left Section */}
      <Box
        sx={{
          marginLeft: { xs: 0, md: 5 },
          width: { xs: "100%", md: "45%" },
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: { xs: "center", md: "flex-start" },
          gap: 3,
          textAlign: { xs: "center", md: "left" },
        }}
      >
        <Box
          component="img"
          src={ksquareLogo}
          alt="Ksquare Logo"
          sx={{
            height: 50,
            width: "auto",
            mx: { xs: "auto", md: 0 },
            marginLeft: 0,
          }}
        />

        <Typography variant="h4" sx={{ fontWeight: 700, color: "#0f2c6d" }}>
          Page Not Found
        </Typography>

        <Typography sx={{ color: "text.secondary", fontSize: "1rem" }}>
          The page you’re looking for doesn’t exist or has been moved.
        </Typography>

        <Button
          component={Link}
          to="/"
          variant="contained"
          size="medium"
          sx={{
            bgcolor: "#0f2c6d",
            // width: { xs: "70%", md: "40%" },
            mx: { xs: "auto", md: 0 },
            borderRadius: 2,
            textTransform: "none",
            fontWeight: 500,
            "&:hover": {
              bgcolor: "#0d245a",
            },
          }}
        >
          Back to Home
        </Button>
      </Box>

      {/* Right Section */}
      <Box
        sx={{
          width: { xs: "100%", md: "55%" },
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          mt: { xs: 5, md: 0 },
        }}
      >
        <Box
          component="img"
          src={pageNotFoundImg}
          alt="Page Not Found"
          sx={{
            width: { xs: "80%", sm: "60%", md: "70%" },
            maxWidth: 500,
          }}
        />
      </Box>
    </Box>
  );
};

export default PageNotFound;
