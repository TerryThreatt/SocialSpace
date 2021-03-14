const { ApolloServer } = require('apollo-server')
const gql = require('graphql-tag')
const mongoose = require('mongoose')

const Post = require('./models/Post')
const { DB } = require('./config')

const typeDefs = gql`
    type Query{
        sayHi: String!
    }
`

const resolvers = {
    Query: {
        getPosts:
    }
}

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