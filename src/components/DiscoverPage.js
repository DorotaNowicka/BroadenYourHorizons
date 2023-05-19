import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { useLocation, useNavigate } from "react-router-dom";

import CountryInfoTable from "./countryTable";
import GET_COUNTRIES_BY_CONTINENT from "../api/query";

// const GET_COUNTRIES_BY_CONTINENT = gql`
//   query GetCountriesByContinent($continentCode: String!) {
//     countries(filter: { continent: { eq: $continentCode } }) {
//       name
//     }
//   }
// `;

function getMultipleRandom(arr, num) {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());

  return shuffled.slice(0, num);
}

const fetchData = async (name) => {
  const response = await fetch(
    `https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,currencies,region,languages`
  );
  if (!response.ok) {
    throw new Error("Data coud not be fetched!");
  } else {
    return response.json();
  }
};

function DiscoverPage(props) {
  const navigate = useNavigate();
  const location = useLocation();
  const continent = location.state?.continent;
  const number = location.state?.number;
  const [tooMany, setTooMany] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [isError, setIsError] = useState(null);
  const [countryItems, initCountry] = useState({});
  const {
    data: countriesFromContinent,
    loading,
    error,
  } = useQuery(GET_COUNTRIES_BY_CONTINENT, {
    variables: { continentCode: continent },
  });

  try {
    const continent = location.state.continent;
    const number = location.state.number;
  } catch (error) {
    navigate("/");
  }

  useEffect(() => {
    if (!loading && !error) {
      const chosenCountries = getMultipleRandom(
        countriesFromContinent.countries,
        number
      )
        .map((country) => country.name)
        .sort((a, b) => a.localeCompare(b));
      if (chosenCountries.length < number) {
        setTooMany(true);
      }

      Promise.all(chosenCountries.map((country) => fetchData(country)))
        .then((responses) => {
          const updatedCountryItems = {};
          responses.forEach((res, index) => {
            updatedCountryItems[chosenCountries[index]] = res[0];
          });
          initCountry((prevCountryItems) => ({
            ...prevCountryItems,
            ...updatedCountryItems,
          }));
        })
        .catch((e) => {
          setIsError("Error occoured. Try again.");
        });

      setIsReady(true);
    }
    return () => {
      setIsError(null);
    };
  }, [loading, error, countriesFromContinent, number]);

  if (loading || error || !isReady) {
    return (
      <div className="loader-container">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="DiscoverPage">
      {tooMany && <h3>This continent has less coutries than you choose.</h3>}
      {isError && <h3>{isError}</h3>}
      {
        <div className="Grid">
          {Object.keys(countryItems).map((item) => {
            return (
              <div className="TableDetails" key={item}>
                <CountryInfoTable country={countryItems[item]} />
              </div>
            );
          })}
        </div>
      }
    </div>
  );
}

export default DiscoverPage;
