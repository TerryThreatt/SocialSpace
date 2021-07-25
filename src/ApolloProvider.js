import {
  ApolloClient,
  ApolloProvider, createHttpLink, InMemoryCache
} from "@apollo/client";
import { setContext } from '@apollo/client/link/context';
import React from "react";
import App from "./App";


const httpLink = createHttpLink({
  uri: "https://social-swap.herokuapp.com",
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("jwtToken");
  return {
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink),
});

export default (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);
