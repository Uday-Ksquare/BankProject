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
            path:"/scr_ddalst",
            element:<DdaLstPage/>
          },
          {
            path:"/upload",
            element:<DocumentUploaderpage/>
          }
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
