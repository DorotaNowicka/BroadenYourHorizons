import React from "react";
import SelectionPage from "../components/SelectionPage";
import DiscoverPage from "../components/DiscoverPage";
import { createBrowserRouter } from "react-router-dom";
import DisplayList from "../components/DisplayList";
const ContentRouter = createBrowserRouter([
  {
    path: "/",
    element: <SelectionPage />,
  },
  {
    path: "/discover",
    element: <DisplayList />,
  },
  {
    path: "/*",
    element: <DiscoverPage />,
  },
]);

export default ContentRouter;
