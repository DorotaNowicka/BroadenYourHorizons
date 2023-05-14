import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import GetRandomCountries from "../api/GetRandomCountries";

function DiscoverPage(props) {
  const location = useLocation();
  const randomCountries = GetRandomCountries(
    location.state.continent,
    location.state.number
  );
  if (randomCountries) {
    if (randomCountries.type != "object") {
      console.log("tu");
    }
  }

  console.log("randomCountries:", randomCountries);
  const [details, setDetails] = useState();
  return <h1>{location.state ? "Udało się" : "Go to Home"}</h1>;
}

export default DiscoverPage;
