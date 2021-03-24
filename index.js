const { ApolloServer } = require('apollo-server')
const gql = require('graphql-tag')
const mongoose = require('mongoose')

const typeDefs = require('./graphql/typeDefs')
const resolvers = require('./graphql/resolvers')
const { DB } = require('./config')



const server = new ApolloServer({
    typeDefs,
    resolvers
})

mongoose.connect(DB, {useNewUrlParser: true})
    .then(() => {
        return server.listen({ port: 5000 })
    })
    .then((res) => {
        console.log(`Server running at ${res.url}`)
    })