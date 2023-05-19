import React from "react";
import { createBrowserRouter } from "react-router-dom";

import DiscoverPage from "../components/DiscoverPage";
import SelectionPage from "../components/SelectionPage";
const ContentRouter = createBrowserRouter([
  {
    path: "/",
    element: <SelectionPage />,
  },
  {
    path: "/discover",
    element: <DiscoverPage />,
  },
  {
    path: "/*",
    element: <SelectionPage />,
  },
]);

export default ContentRouter;
