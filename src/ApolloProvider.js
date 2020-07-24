import React from "react"
import App from "./App"
import ApolloClient from "apollo-client"
import { InMemoryCache } from "apollo-cache-inmemory"
import { createHttpLink } from "apollo-link-http"
import { ApolloProvider } from "@apollo/react-hooks"
import { setContext } from "apollo-link-context"

//let URI = process.env.NODE_ENV === "production" ? process.env.PRODUCTION_URI : process.env.DEVELOPMENT_URI

const httpLink = createHttpLink({
  uri: "https://mentorcards.herokuapp.com/",
})

const authLink = setContext(() => {
  const token = localStorage.getItem("jwtToken")
  return {
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    },
  }
})

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
})

export default (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
)

import { ApolloProvider } from "@apollo/react-common"
import ApolloClient, { InMemoryCache } from "apollo-boost"
import API_BASE_URL, { ACCESS_TOKEN } from "js/constants/api"
const client = new ApolloClient({
  uri: `${API_BASE_URL}/graphql`,
  cache: new InMemoryCache(),
  request: (operation) => {
    const token = localStorage.getItem(ACCESS_TOKEN)
    operation.setContext({
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
    })
  },
})
ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById("root")
)
