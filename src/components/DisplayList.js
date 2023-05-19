import React, { useEffect, useState } from "react";
import useGetCountries from "../api/useGetCountries";
import { ApolloClient, InMemoryCache, gql, useQuery } from "@apollo/client";
import CountryInfoTable from "./countryTable";
import { key } from "localforage";
import { useLocation, useNavigate } from "react-router-dom";

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

function DisplayList(props) {
  const navigate = useNavigate();
  const location = useLocation();
  const continent = location.state?.continent;
  const number = location.state?.number;
  const [tooMany, setTooMany] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [isError, setIsError] = useState(null);
  const [randomCountries, setRandomCountries] = useState({});
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
      setRandomCountries((randomCountries) => ({
        ...randomCountries,
        countries: countriesFromContinent.countries,
      }));

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
  }, [loading, error, countriesFromContinent]);

  if (loading || error) {
    return <h1>Loading....</h1>;
  }

  return (
    <div className="DiscoverPage">
      {tooMany ? (
        <h3>This continent has less coutries than you choose.</h3>
      ) : null}
      {isError ? <h3>{isError}</h3> : null}
      {!isReady ? (
        <h2>Loading countries details...</h2>
      ) : (
        <div className="Grid">
          {Object.keys(countryItems).map((item) => {
            return (
              <div className="TableDetails" key={item}>
                <CountryInfoTable country={countryItems[item]} />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default DisplayList;
