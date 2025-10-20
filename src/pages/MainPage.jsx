import { Box, Paper, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import BaseCard from "../components/BaseCard";
import { Link } from "react-router-dom";
import apiClient from "../services/apiClient";

const MainPage = () => {
  const [screens, setScreens] = useState([]);
  useEffect(() => {
    apiClient
      .get(`/screens/menu`)
      .then((response) => {
        setScreens(response.data?.data || []);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  console.log(screens);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        minHeight: "80vh",
        alignContent: "center",
        gap: "30px",
      }}
    >
      <Box>
        <Typography
          sx={{
            fontSize: "30px",
            textAlign: "center",
            padding: "10px",
            fontFamily: "Outfit",
            color: "rgba(15, 44, 109, 1)",
            letterSpacing: "0.25px",
            fontWeight: 700,
          }}
        >
          Welcome to the CFO Reporting Tool
        </Typography>
        <Typography
          sx={{
            fontSize: "20px",
            textAlign: "center",
            padding: "10px",
            fontFamily: "Inter",
            color: "rgba(118, 118, 118, 1)",
          }}
        >
          Select a Report Type
        </Typography>
      </Box>

      <Stack 
        direction="row"
        spacing={0}
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: "10px",
          flexWrap: "wrap",
        }}
      >
        {screens.map((item) => (
          <Link
            style={{ textDecoration: "none", color: "black" }}
            to={`/${item.screenId}`}
          >
            <BaseCard
              screen_name={item.reptype_id}
              screen_description={item.reptype_description}
            />
          </Link>
        ))}
      </Stack>
    </Box>
  );
};

export default MainPage;
