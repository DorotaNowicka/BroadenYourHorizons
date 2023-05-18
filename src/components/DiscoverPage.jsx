import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { gql } from "@apollo/client";

import CountryInfoTable from "./countryTable";

import continentsSymbol from "../assets/continentsSymbol";

const GET_COUNTRIES_BY_CONTINENT = gql`
  query GetCountriesByContinent($continentCode: String!) {
    countries(filter: { continent: { eq: $continentCode } }) {
      name
    }
  }
`;

function getMultipleRandom(arr, num) {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());

  return shuffled.slice(0, num);
}

function DiscoverPage(props) {
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const [number, setNumber] = useState();

  const [countryItems, initCountry] = useState([]);

  const fetchData = async (name) => {
    const response = await fetch(
      `https://restcountries.com/v3.1/subregion/${name}?fields=name,capital,population,currencies,subregion,languages`
    );
    if (!response.ok) {
      throw new Error("Data coud not be fetched!");
    } else {
      return response.json();
    }
  };

  useEffect(() => {
    if (location.state) {
      const continent = location.state.continent;
      setNumber(location.state.number);
      const symbol = continentsSymbol.filter(
        (item) => item.code === continent
      )[0].restName;

      fetchData(symbol)
        .then((res) => {
          initCountry(res);
        })
        .catch((e) => {
          console.log(e.message);
        });
      setLoading(false);
    } else {
      navigate("/");
    }
  }, []);

  return (
    <div className="DiscoverPage">
      <h1 style={{ padding: "10px" }}>Country Details</h1>
      {loading && <h2>Loading countries details...</h2>}
      <div className="Grid">
        {getMultipleRandom(countryItems, number).map((item) => {
          return (
            <div className="TableDetails" key={item.name.common}>
              <CountryInfoTable country={item} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default DiscoverPage;
