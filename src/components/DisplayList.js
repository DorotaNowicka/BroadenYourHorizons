import React, { useEffect, useState } from "react";
import useGetCountries from "../api/useGetCountries";
import { ApolloClient, InMemoryCache, gql, useQuery } from "@apollo/client";
import CountryInfoTable from "./countryTable";

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
    `https://restcountries.com/v3.1/name/${name}?fullText=true&fields=name,capital,population,currencies,region,languages`
  );
  if (!response.ok) {
    throw new Error("Data coud not be fetched!");
  } else {
    return response.json();
  }
};

function DisplayList(props) {
  const continent = "EU";
  const number = 3;
  const [isReady, setIsReady] = useState(false);
  const [randomCountries, setRandomCountries] = useState({ countries: "" });
  const [countryItems, initCountry] = useState([]);
  const {
    data: countriesFromContinent,
    loading,
    error,
  } = useQuery(GET_COUNTRIES_BY_CONTINENT, {
    variables: { continentCode: continent },
  });

  useEffect(() => {
    console.log("0");
    if (!loading && !error) {
      setRandomCountries((randomCountries) => ({
        ...randomCountries,
        countries: countriesFromContinent.countries,
      }));
      console.log("1", countriesFromContinent.countries);
      const chosenCountries = getMultipleRandom(
        countriesFromContinent.countries,
        number
      ).map((country) => country.name);
      console.log(chosenCountries);

      chosenCountries.forEach((country) => {
        fetchData(country)
          .then((res) => {
            countryItems[country] = res;

            //initCountry((countryItems) => countryItems.push(res));
          })

          .catch((e) => {
            console.log(e.message);
          });
      });
      console.log("na koniec", countryItems);
      console.log(countryItems);
      setIsReady(true);
    }
    return () => {
      console.log("cleaned");
    };
  }, [loading, error, countriesFromContinent]);

  if (loading || error) {
    return <h1>Loading...</h1>;
  }
  return (
    <div className="DiscoverPage">
      <h1 style={{ padding: "10px" }}>Country Details</h1>
      {!isReady && <h2>Loading countries details...</h2>}
      <div className="Grid">
        {countryItems.map((item) => {
          return (
            <div className="TableDetails" key={item[0].name.common}>
              <CountryInfoTable country={item[0]} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default DisplayList;
