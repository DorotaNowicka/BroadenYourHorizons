import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SelectionPage from "./components/SelectionPage";
import Header from "./components/Header";
import DiscoverPage from "./components/DiscoverPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <SelectionPage />,
  },
  {
    path: "/discover",
    element: <DiscoverPage />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Header />
    <RouterProvider router={router} />
  </React.StrictMode>
);
