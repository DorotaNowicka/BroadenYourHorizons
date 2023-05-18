import React, { useState, useEffect } from "react";
import {
  ApolloClient,
  InMemoryCache,
  gql,
  useQuery,
  useLazyQuery,
} from "@apollo/client";
import client from "./client";

const useGetCountries = async (continent) => {
  const [randomCountries, setRandomCountries] = useState(null);

  const GET_COUNTRIES_BY_CONTINENT = gql`
    query GetCountriesByContinent($continentCode: String!) {
      countries(filter: { continent: { eq: $continentCode } }) {
        name
      }
    }
  `;

  const data = client
    .query({
      query: GET_COUNTRIES_BY_CONTINENT,
      variables: { continentCode: continent },
    })
    .then((response) => {
      return response.data ? response.data.countries : "dupa";
    });
};

export default useGetCountries;
