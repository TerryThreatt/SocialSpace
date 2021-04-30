import React from 'react'
import App from './App'
import ApolloClient from '@apollo/client'

const client = new ApolloClient({
    link: 'http://localhost:5000'
})

export default (
    <ApolloClient client={client}>
        <App />
    </ApolloClient>
)