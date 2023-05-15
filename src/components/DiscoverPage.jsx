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
import continentsFull from "../assets/continentsFull";
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

// function DisplayCountries() {
//   const [randomCountries, setRandomCountries] = useState(
//     continentsFull.filter((cont) => cont.code === "EU")
//   );
//   const location = useLocation();
//   const continent = location.state.continent;

//   const { loading, error, data } = useQuery(GET_COUNTRIES_BY_CONTINENT, {
//     variables: { continentCode: continent },
//   });

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>Error : {error.message}</p>;

//   console.log(data.countries);

//   console.log(randomCountries);

//   return getMultipleRandom(randomCountries[0].countries, 2).map(({ code }) => (
//     <div key={code}>
//       <h3>{code}</h3>
//     </div>
//   ));
// }

function DiscoverPage(props) {
  const location = useLocation();
  const continent = location.state.continent;
  const number = location.state.number;
  const symbol = continentsSymbol.filter((item) => item.code === continent)[0]
    .restName;

  const [countryItems, initCountry] = useState([]);
  // const [randomCountries, setRandomCountries] = useState(
  //   getMultipleRandom(
  //     continentsFull.filter((cont) => cont.code === continent)[0].countries,
  //     2
  //   )
  // );

  const fetchData = async () => {
    const response = await fetch(
      `https://restcountries.com/v3.1/subregion/${symbol}?fields=name,capital,population,currencies,subregion,languages`
    );
    if (!response.ok) {
      throw new Error("Data coud not be fetched!");
    } else {
      return response.json();
    }
  };
  useEffect(() => {
    fetchData()
      .then((res) => {
        initCountry(res);
      })
      .catch((e) => {
        console.log(e.message);
      });
  }, []);

  return (
    <div className="DiscoverPage">
      <h1 style={{ padding: "10px" }}>Country Details</h1>
      {getMultipleRandom(countryItems, number).map((item) => {
        return (
          <div className="TableDetails" key={item.name.common}>
            <CountryInfoTable country={item} />
          </div>
        );
      })}
    </div>
  );
}

export default DiscoverPage;
