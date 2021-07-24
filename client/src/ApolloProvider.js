import React from "react";
import App from "./App";
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  createHttpLink
} from "@apollo/client";
import { setContext } from '@apollo/client/link/context'


const httpLink = createHttpLink({
  uri: "http://localhost:5000"
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
