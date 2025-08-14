import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// import './index.css'
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router";
import Layout from "./layouts/dashboard.jsx";
import SupplementsL1 from "./components/SupplementsL1.jsx";
import SupplementsL2 from "./components/SupplementsL2.jsx";
import DocumentUploaderpage from "./pages/DocumentuploaderPage.jsx";

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "/",
        element: <Layout />,
        children: [
          {
            path: "/suplementl1",
            element: <SupplementsL1 />,
          },
          {
            path:"/suplementl2",
            element:<SupplementsL2/>
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
