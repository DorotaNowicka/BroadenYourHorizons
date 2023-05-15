import React, { useState } from "react";
import SelectionPage from "../components/SelectionPage";
import DiscoverPage from "../components/DiscoverPage";
import { createBrowserRouter } from "react-router-dom";
const ContentRouter = createBrowserRouter([
  {
    path: "/",
    element: <SelectionPage />,
  },
  {
    path: "/discover",
    element: <DiscoverPage />,
  },
]);

export default ContentRouter;
