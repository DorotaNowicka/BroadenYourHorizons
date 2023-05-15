import React from "react";
import "./App.css";
import Header from "./components/Header";

import ContentRouter from "./routing/router";

function App() {
  return (
    <div>
      <Header />
      <ContentRouter />
    </div>
  );
}

export default App;
