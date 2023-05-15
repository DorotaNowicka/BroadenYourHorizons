import React, { useState, useEffect } from "react";
import {
  ApolloClient,
  InMemoryCache,
  gql,
  useQuery,
  useLazyQuery,
} from "@apollo/client";

const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: "https://countries.trevorblades.com",
});

function getMultipleRandom(arr, num) {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());

  return shuffled.slice(0, num);
}

const GetRandomCountries = async (continent, number) => {
  const [randomCountries, setRandomCountries] = useState(null);
  const continentCode = continent;
  console.log("params: ", continent, number);
  const GET_COUNTRIES_BY_CONTINENT = gql`
    query GetCountriesByContinent($continentCode: String!) {
      countries(filter: { continent: { eq: $continentCode } }) {
        name
      }
    }
  `;
  // const [getProducts, { data, loading, error }] = useLazyQuery(
  //   GET_COUNTRIES_BY_CONTINENT,
  //   {
  //     variables: { continentCode: continent },
  //     client,
  //     onCompleted: () =>
  //       setRandomCountries(
  //         getMultipleRandom(
  //           data.countries.map((country) => country.name),
  //           number
  //         )
  //       ),
  //   }
  // );

  const getThem = async () => {
    const { data } = await client.query({
      query: GET_COUNTRIES_BY_CONTINENT,
      variables: { continentCode: continent },
    });
    setRandomCountries(data.countries);
  };

  // if (error) {
  //   return <p>{error.message}</p>;
  // }
  if (randomCountries === null) {
    getThem();
  }
  if (randomCountries !== null) {
    // return getMultipleRandom(
    //   data.countries.map((country) => country.name),
    //   number
    // );
    console.log("here");
    console.log(randomCountries);
    return randomCountries;
  }
};

export default GetRandomCountries;
