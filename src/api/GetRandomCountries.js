import React, { useState, useEffect } from "react";
import { ApolloClient, InMemoryCache, gql, useQuery } from "@apollo/client";

const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: "https://countries.trevorblades.com",
});

function getMultipleRandom(arr, num) {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());

  return shuffled.slice(0, num);
}

const GetRandomCountries = (continent, number) => {
  const continentCode = continent;
  console.log("params: ", continent, number);
  const GET_COUNTRIES_BY_CONTINENT = gql`
    query GetCountriesByContinent($continentCode: String!) {
      countries(filter: { continent: { eq: $continentCode } }) {
        name
      }
    }
  `;
  const { data, loading, error } = useQuery(GET_COUNTRIES_BY_CONTINENT, {
    variables: { continentCode: continent },
    client,
  });

  if (error) {
    return <p>{error.message}</p>;
  }
  if (data) {
    return getMultipleRandom(
      data.countries.map((country) => country.name),
      number
    );
  }
};

export default GetRandomCountries;
