import React, { Component, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  ApolloClient,
  InMemoryCache,
  gql,
  useQuery,
  useLazyQuery,
} from "@apollo/client";

import axios from "axios";
import CountryInfoTable from "./countryTable";

function DiscoverPage(props) {
  const [ready, setReady] = useState(false);
  const location = useLocation();
  const continent = location.state.continent;
  const [randomCountries, setRandomCountries] = useState(["Poland", "Spain"]);
  const [details, setDetails] = useState();

  const client = new ApolloClient({
    cache: new InMemoryCache(),
    uri: "https://countries.trevorblades.com",
  });

  const GET_COUNTRIES_BY_CONTINENT = gql`
    query GetCountriesByContinent($continentCode: String!) {
      countries(filter: { continent: { eq: $continentCode } }) {
        name
      }
    }
  `;

  const { data } = useLazyQuery(client, {
    query: GET_COUNTRIES_BY_CONTINENT,
    variables: { continentCode: continent },
  });

  console.log("tu", randomCountries);

  // const changeCountries = async () => {
  //   const kraje = await GetCountries(location.state.continent);
  //   setRandomCountries(kraje);
  // };

  // useEffect(() => {
  //   changeCountries();
  //   console.log(randomCountries);
  // }, []);

  // useEffect(() => {
  //   setRandomCountries(
  //     GetRandomCountries(location.state.continent, location.state.number)
  //   );
  // }, []);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const countries = GetRandomCountries(
  //       location.state.continent,
  //       location.state.number
  //     );
  //     setRandomCountries(countries);
  //   };
  //   fetchData();
  // }, []);

  // const getData = async (country) => {
  //   const response = await axios
  //     .get(
  //       `https://restcountries.com/v3.1/name/${country}?fields=name,capital,population,currencies,subregion,languages`
  //     )
  //     .then((response) => {
  //       console.log(response.data[0]);
  //       setDetails(response.data[0]);
  //     })
  //     .catch((err) => {
  //       console.error(err);
  //     });
  // };

  // if (randomCountries) {
  //   if (randomCountries.type !== "object") {
  //     setReady(true);
  //   }
  // }

  // useEffect(() => {
  //   const getData = async (country) => {
  //     try {
  //       const response = await axios.get(
  //         "https://restcountries.com/v3.1/name/${country}?fields=name,capital,population,currencies,subregion,languages"
  //       );
  //       console.log(response.data[0]);
  //       setDetails((prevDetails) => [...prevDetails, response.data[0]]);
  //     } catch (err) {
  //       console.error(err);
  //     }

  //     randomCountries.forEach((country) => {
  //       getData(country);
  //     });
  //   };
  // }, []);

  // useEffect(() => {
  //   getData("Poland");
  // }, []);

  //console.log("randomCountries:", randomCountries);

  return (
    <div>
      <h1>Country Details</h1>
      {/* {details.map((country) => (
        
        // <CountryInfoTable country={country} key={country.name.common} />
      ))} */}
    </div>
  );
}

export default DiscoverPage;
