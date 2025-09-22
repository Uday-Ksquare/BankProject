import * as React from "react";
import { Link, NavLink, Outlet } from "react-router";
import {
  AppBar,
  Box,
  IconButton,
  Toolbar,
  Tooltip,
  Avatar,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useMediaQuery,
  Typography,
  Button,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useTheme } from "@mui/material/styles";
import TheKsquareGroupLogo from "../assets/TheKsquareLogo.svg";
import XLS from "../assets/XLS.svg";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

const drawerWidth = 270;

export default function Layout() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md")); // md breakpoint
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [screens, setScreens] = useState([]);

  const fetchScreens = () => {
    axios
      .get("http://34.51.85.243:8080/api/dynamic/screens")
      .then((response) => {
        setScreens(response.data?.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  // console.log(screens);

  useEffect(() => {
    fetchScreens();
  }, []);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawerContent = (
    <>
      <Toolbar /> {/* Push content below AppBar */}
      <List>
        <ListItem
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
          disablePadding
        >
          <ListItemText
            sx={{
              mt: 2,
              ml: 2,
              color: "#757575",
              "& .MuiListItemText-primary": {
                fontSize: "13px", // primary text font size
              },
            }}
            primary="MAIN ITEMS"
          />
          <ListItemText
            sx={{
              mt: 2,
              ml: 2,
              color: "#757575",
              "& .MuiListItemText-primary": {
                fontSize: "11px", // primary text font size
              },
            }}
            primary="FILES"
          />
        </ListItem>
      </List>
      <List sx={{ overflowY: "auto", height: "70%" }}>
        {screens.map(({ screenName, screenId }) => (
          <NavLink
            key={screenId}
            to={screenId}
            style={{ textDecoration: "none", color: "inherit" }}
            className={({ isActive }) => (isActive ? "active-link" : "")}
          >
            <ListItem
              sx={{
                ":hover": { background: "#E2F0FF" },
                "&.Mui-selected": { background: "#E2F0FF" }, // for MUI selected state
              }}
              disablePadding
            >
              <ListItemButton
                selected={window.location.pathname.includes(screenId)} // highlights on active
              >
                <ListItemIcon sx={{ minWidth: "30px" }}>
                  <img style={{ height: 18 }} src={XLS} alt="" />
                </ListItemIcon>
                <ListItemText
                  sx={{
                    "& .MuiListItemText-primary": {
                      fontSize: "14px",
                    },
                  }}
                  primary={screenName}
                />
              </ListItemButton>
            </ListItem>
          </NavLink>
        ))}
      </List>
      <Box sx={{ flexGrow: 1 }} />
      <Box
        sx={{ display: "flex", justifyContent: "space-between", mb: 2, px: 2 }}
      >
        <Link to={"/upload"}>
          <Button size="small" sx={{ bgcolor: "#1E326B" }} variant="contained">
            Upload File
          </Button>
        </Link>
        <Button
          sx={{ borderColor: "#1E326B", color: "#1E326B" }}
          variant="outlined"
          size="small"
        >
          Export
        </Button>
      </Box>
    </>
  );

  return (
    <Box sx={{ display: "flex", width: "100%", height: "100vh" }}>
      {/* Main Content */}
      <Box
        sx={{
          flexGrow: 1,
          width: "100%", // leave space for sidebar
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* AppBar */}
        <AppBar
          position="fixed"
          sx={{
            zIndex: (theme) => theme.zIndex.drawer + 1,
          }}
        >
          <Toolbar
            sx={{
              background:
                "linear-gradient(90deg, #1E326B 23.09%, #46A0B6 123.72%)",
            }}
          >
            {/* Logo */}
            <img
              src={TheKsquareGroupLogo}
              alt="The Ksquare Group Logo"
              style={{ height: 40, marginRight: "16px" }}
            />

            <Box sx={{ flexGrow: 1 }} />

            {/* Show Menu Icon only on Mobile */}
            {
              <IconButton
                color="inherit"
                edge="end"
                onClick={handleDrawerToggle}
              >
                <MenuIcon />
              </IconButton>
            }

            {/* Avatar (desktop only) */}
            {/* {!isMobile && (
              <Tooltip title="Open settings">
                <IconButton onClick={() => {}} sx={{ p: 0 }}>
                  <Avatar
                    sx={{ color: "#000000", backgroundColor: "#FFFFFF" }}
                    alt="Uday Kumar"
                    src="/static/images/avatar/2.jpg"
                  />
                </IconButton>
              </Tooltip>
            )} */}
          </Toolbar>
        </AppBar>

        {/* Page content */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            width: "100%",
            mt: "64px", // AppBar height
            backgroundColor: "#F5F8FA",
            overflow: "auto",
            p: 3,
          }}
        >
          <Typography
            variant="h6"
            align="start"
            sx={{ color: "#1E326B", fontWeight: 600, fontSize: "18px" }}
            gutterBottom
          >
            ECCB PR01 Template Viewer
          </Typography>
          <Box sx={{ mt: 2, flex: 1 }}>
            <Outlet />
          </Box>
        </Box>
      </Box>

      {/* Drawer */}

      <Drawer
        sx={{
          width: "350px",
          flexShrink: 0,
          "& .MuiDrawer-paper": { width: "350px", boxSizing: "border-box" },
        }}
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // improves mobile performance
        }}
      >
        {drawerContent}
      </Drawer>
    </Box>
  );
}
