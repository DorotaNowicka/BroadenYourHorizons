import { ApolloProvider } from "@apollo/client";
import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.css";
import "./index.css";

import client from "./api/client";
import ContentRouter from "./routing/router";
import Header from "./components/Header";
import DisplayList from "./components/DiscoverPage";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ApolloProvider client={client}>
    <React.StrictMode>
      <Header />
      <RouterProvider router={ContentRouter} />
    </React.StrictMode>
  </ApolloProvider>
);
