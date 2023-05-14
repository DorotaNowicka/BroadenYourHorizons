import React from "react";
import { useLocation } from "react-router-dom";

function DiscoverPage(props) {
  const location = useLocation();
  console.log(location.state);

  return <h1>{location.state ? location.state.continent : "Go to Home"}</h1>;
}

export default DiscoverPage;
