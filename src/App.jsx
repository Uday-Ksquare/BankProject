import * as React from "react";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { ReactRouterAppProvider } from "@toolpad/core/react-router";
import { Link, Outlet } from "react-router";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";

const NAVIGATION = [
  {
    kind: "header",
    title: "Main items",
  },
  {
    segment: "suplementl1",
    title: "Supplement l1",
    icon: <InsertDriveFileIcon />,
  },
  {
    segment: "suplementl2",
    title: "Supplement l2",
    icon: <InsertDriveFileIcon />,
  },
];

const BRANDING = {
  title: "ECCB PR01 Template Viewer",
  logo: (
    <Link to="/suplementl1" style={{ display: "inline-block" }}>
      <img
        src="https://appexchange.salesforce.com/partners/servlet/servlet.FileDownload?file=00P4V00000pDs87UAC"
        alt="ECCB Logo"
        style={{ height: 40 }}
      />
    </Link>
  ),
};

export default function App() {
  return (
    <ReactRouterAppProvider navigation={NAVIGATION} branding={BRANDING}>
      <Outlet />
    </ReactRouterAppProvider>
  );
}
