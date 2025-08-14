import * as React from "react";
import { Link, Outlet } from "react-router";
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
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import MenuIcon from "@mui/icons-material/Menu";
import { useTheme } from "@mui/material/styles";
import TheKsquareGroupLogo from "../assets/TheKsquareLogo.svg";
import XLS from "../assets/XLS.svg";

const drawerWidth = 290;

export default function Layout() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md")); // md breakpoint
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const routes = {
    "Supplement | 1": "/suplementl1",
    "Supplement | 2": "/suplementl2",
    "Supplement | 3": "/suplementl3",
    "Supplement | 4": "/suplementl4",
    "Supplement | 5": "/suplementl5",
    "Supplement | 6": "/suplementl6",
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
      <List>
        {[
          "Supplement | 1",
          "Supplement | 2",
          "Supplement | 3",
          "Supplement | 4",
          "Supplement | 5",
          "Supplement | 6",
        ].map((text) => (
          <Link
            key={text}
            style={{ textDecoration: "none", color: "inherit" }}
            to={routes[text]}
          >
            <ListItem
              sx={{
                // ml: 1,
                // pl:1,
                ":hover": { background: "#E2F0FF" },
                ":active": { background: "#E2F0FF" },
                ":focus": { background: "#E2F0FF" },
                // border:"1px solid"
              }}
              key={text}
              disablePadding
            >
              <ListItemButton>
                <ListItemIcon sx={{ minWidth: "30px" }}>
                  {/* {" "} */}
                  <img style={{ height: 18 }} src={XLS} alt="" srcset="" />
                </ListItemIcon>
                <ListItemText
                  sx={{
                    "& .MuiListItemText-primary": {
                      fontSize: "14px", // primary text font size
                    },
                  }}
                  primary={text}
                />
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
      </List>
      <Box sx={{ flexGrow: 1 }}/>
      <Box
        sx={{ display: "flex", justifyContent: "space-between", mb: 2, px: 2 }}
      >
        <Link to={"/upload"}>
        <Button size="small" sx={{bgcolor:"#1E326B"}} variant="contained">
          Upload File
        </Button></Link>
        <Button sx={{borderColor:"#1E326B",color:"#1E326B"}} variant="outlined" size="small">
          Export
        </Button>
      </Box>
    </>
  );

  return (
    <Box sx={{ display: "flex", width: "100%" }}>
      {/* Main Content */}
      <Box sx={{ flexGrow: 1 }}>
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
            {isMobile && (
              <IconButton
                color="inherit"
                edge="end"
                onClick={handleDrawerToggle}
              >
                <MenuIcon />
              </IconButton>
            )}

            {/* Avatar (desktop only) */}
            {!isMobile && (
              <Tooltip title="Open settings">
                <IconButton onClick={() => {}} sx={{ p: 0 }}>
                  <Avatar
                    sx={{ color: "#000000", backgroundColor: "#FFFFFF" }}
                    alt="Uday Kumar"
                    src="/static/images/avatar/2.jpg"
                  />
                </IconButton>
              </Tooltip>
            )}
          </Toolbar>
        </AppBar>

        {/* Page content */}
        <Box
          component="main"
          sx={{
            p: 3,
            mt: 8,
            backgroundColor: "#F5F8FA",
            flexGrow: 1,
            height: "100%",
            overflow: "auto",
          }}
        >
          <Typography
            variant="h6"
            align="start"
            sx={{ color: "#1E326B", fontWeight: 600, fontSize: "18px" }}
            fontWeight="bold"
            gutterBottom
          >
            ECCB PR01 Template Viewer
          </Typography>
          <Outlet />
        </Box>
      </Box>

      {/* Drawer */}
      {isMobile ? (
        <Drawer
          sx={{
            width: "250px",
            flexShrink: 0,
            "& .MuiDrawer-paper": { width: "250px", boxSizing: "border-box" },
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
      ) : (
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
            },
          }}
          anchor="right"
          variant="permanent"
          open
        >
          {drawerContent}
        </Drawer>
      )}
    </Box>
  );
}
