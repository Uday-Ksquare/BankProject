import * as React from "react";
import { Link, NavLink, Outlet, useSearchParams } from "react-router";
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
  Select,
  FormControl,
  InputLabel,
  MenuItem,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useTheme } from "@mui/material/styles";
import TheKsquareGroupLogo from "../assets/TheKsquareLogo.svg";
import XLS from "../assets/XLS.svg";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import GlAccessDropDown from "../components/GlAccessDropDown";
import docIcon from "../assets/docIcon.svg";
import InputIcon from "../assets/InputIcon.svg";
import SuppIcon from "../assets/Supp.svg";
import OutputIcon from "../assets/Output.svg";
import BookMarkIcon from "../assets/bookMark.svg";
import {
  Sidebar,
  Menu,
  MenuItem as MenuItemPro,
  SubMenu,
} from "react-pro-sidebar";

export default function Layout() {
  const theme = useTheme();
  const [searchParams, setSearchParams] = useSearchParams();
  const reportType = searchParams.get("reportType") || "PR01";
  const [openSubMenu, setOpenSubMenu] = useState(null);

  const handleSubMenuToggle = (menuName) => {
    setOpenSubMenu((prev) => (prev === menuName ? null : menuName));
  };

  const isMobile = useMediaQuery(theme.breakpoints.down("md")); // md breakpoint
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [screens, setScreens] = useState([]);

  const fetchScreens = () => {
    axios
      .get(`http://34.51.85.243:8080/api/dynamic/screens/menu/${reportType}`)
      .then((response) => {
        setScreens(response.data?.data?.categoryScreens || {});
      })
      .catch((error) => {
        console.log(error);
      });
  };
  // console.log(screens);

  useEffect(() => {
    fetchScreens();
  }, [reportType]);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box sx={{ display: "flex", width: "100%", height: "100vh" }}>
      {/* Main Content */}
      <Box
        sx={{
          flexGrow: 1,
          width: "80%", // leave space for sidebar
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
            <Link to="/">
              <img
                src={TheKsquareGroupLogo}
                alt="TheKsquareGroupLogo"
                style={{ height: "40px" }}
              />
            </Link>

            {isMobile ? null : <Box sx={{ flexGrow: 1 }} />}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                color: "#FFFFFF",
                gap: 2,
              }}
            >
              <GlAccessDropDown
                textColorIsWhite={true}
                // period={period}
                // setPeriod={setPeriod}
              />
              {
                <IconButton
                  color="inherit"
                  edge="end"
                  onClick={handleDrawerToggle}
                >
                  <MenuIcon />
                </IconButton>
              }
            </Box>
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
          <Box sx={{ mt: 2, flex: 1 }}>
            <Outlet />
          </Box>
        </Box>
      </Box>
      <Sidebar
        collapsed={mobileOpen}
        width="20%"
        style={{ marginTop: "100px" }}
        collapsedWidth="0"
      >
        <Box sx={{ width: "91%" }}>
          <FormControl fullWidth sx={{ margin: 2 }}>
            <InputLabel id="demo-simple-select-label">Report</InputLabel>
            <Select
              size="small"
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={reportType}
              label="Report"
              onChange={(e) => {
                setSearchParams({ reportType: e.target.value });
              }}
            >
              <MenuItem value={"PR01"}>PR01</MenuItem>
              <MenuItem value={"PR04"}>PR04</MenuItem>
              <MenuItem value={"PR09"}>PR09</MenuItem>
              <MenuItem value={"PR10"}>PR10</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Menu>
          {/* <MenuItem> Dashboard </MenuItem> */}
          <SubMenu
            icon={<img src={InputIcon} alt="Input Icon" height={20} />}
            label="Source Files"
            open={openSubMenu === "source_files"}
            onOpenChange={() => handleSubMenuToggle("source_files")}
          >
            {screens.sourceFiles &&
              screens.sourceFiles.map((file) => (
                <MenuItemPro style={{marginLeft: "20px"}} component={<Link to={file.screen_id} />}>
                  {" "}
                  {file.screen_name}{" "}
                </MenuItemPro>
              ))}
          </SubMenu>
          <SubMenu
            icon={<img src={OutputIcon} alt="OutputIcon Icon" height={25} />}
            label="Report Files"
          >
            <SubMenu
              icon={<img src={docIcon} alt="OutputIcon Icon" height={25} />}
              label="Reports"
              open={openSubMenu === "reports"}
              onOpenChange={() => handleSubMenuToggle("reports")}
            >
              {screens.outputFIles &&
                screens.outputFIles.map((file) => (
                  <MenuItemPro
                    icon={<img src={BookMarkIcon} />}
                    component={<Link to={file.screen_id} />}
                  >
                    {" "}
                    {file.screen_name}{" "}
                  </MenuItemPro>
                ))}
            </SubMenu>
            <SubMenu
              icon={<img src={SuppIcon} alt="OutputIcon Icon" height={25} />}
              label="Supplements"
              open={openSubMenu === "supplements"}
              onOpenChange={() => handleSubMenuToggle("supplements")}
            >
              {screens.reportFiles &&
                screens.reportFiles.map((file) => (
                  <MenuItemPro style={{marginLeft: "20px"}} component={<Link to={file.screen_id} />}>
                    {" "}
                    {file.screen_name}{" "}
                  </MenuItemPro>
                ))}
            </SubMenu>
          </SubMenu>

          <MenuItemPro> Upload </MenuItemPro>
          {/* <MenuItem> Calendar </MenuItem> */}
        </Menu>
      </Sidebar>
    </Box>
  );
}
