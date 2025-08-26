import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// import './index.css'
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router";
import Layout from "./layouts/Dashboard.jsx";
import SupplementsL1 from "./components/SupplementsL1.jsx";
import SupplementsL2 from "./components/SupplementsL2.jsx";
import DocumentUploaderpage from "./pages/DocumentuploaderPage.jsx";
import CdsLstPage from "./pages/CdsLstPage.jsx";
import DdaLstPage from "./pages/DdaLstPage.jsx";
import FinDepPage from "./pages/FinDepPage.jsx";
import FinLnsPage from "./pages/FinLnsPage.jsx";
import InvLstPage from "./pages/InvLstPage.jsx";
import SavLstPage from "./pages/SavLstPage.jsx";
import Example from "./pages/Nested.jsx";
import SupplimentDepositPage from "./pages/SupplimentDepositPage.jsx";
import PrMapPage from "./pages/PrMapPage.jsx";
import SuppGLoansPage from "./pages/SuppGLoansPage.jsx";

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "/",
        element: <Layout />,
        children: [
          {
            path: "/scr_cdslst",
            element: <CdsLstPage />,
          },
          {
            path: "/scr_ddalst",
            element: <DdaLstPage />,
          },
          {
            path: "/upload",
            element: <DocumentUploaderpage />,
          },
          {
            path: "/scr_findep",
            element: <FinDepPage />,
          },
          {
            path: "/scr_finlns",
            element: <FinLnsPage />,
          },
          {
            path: "/scr_invlst",
            element: <InvLstPage />,
          },
          {
            path: "/scr_savlst",
            element: <SavLstPage />,
          },
          {
            path: "/scr_worksheet",
            element: <Example />,
          },
          {
            path: "/scr_supp_a_deposits",
            element: <SupplimentDepositPage />,
          },
          {
            path: "/scr_pr01_map",
            element: <PrMapPage />,
          },
          {
            path: "/scr_supp_g_loans",
            element: <SuppGLoansPage />,
          },
        ],
      },

      // {
      //   path: "/orders",
      //   element: <div>Orders</div>,
      // },
    ], // root layout route
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
