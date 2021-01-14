// const { GraphQLServer } = require('graphql-yoga')
// const { prisma } = require('./generated/prisma-client')
// const Query = require('./resolvers/Query')
// const Mutation = require('./resolvers/Mutation')
// const User = require('./resolvers/User')
// const Link = require('./resolvers/Link')
// const Vote = require('./resolvers/Vote')
// const Subscription = require('./resolvers/Subscription')

// // リゾルバー関数
// const resolvers = {
//   Query,
//   Mutation,
//   Subscription,
//   User,
//   Link,
//   Vote,
// }

// // GraphQLサーバー
// const server = new GraphQLServer({
//   typeDefs: './src/schema.graphql',
//   resolvers,
//   context: request => {
//     return {
//       ...request,
//       prisma,
//     }
//   },
// })
// server.start(() => console.log(`Server is running on http://localhost:4000`))

const { ApolloServer } = require('apollo-server');
const fs = require('fs');
const path = require('path');

let links = [{
    id: 'link-0',
    url: 'www.howtographql.com',
    description: 'Fullstack tutorial for GraphQL'
}]

let idCount = links.length
const resolvers = {
    Query: {
        info: () => `This is the API of a Hackernews Clone`,
        feed: () => links,
    },
    Mutation: {
        post: (parent, args) => {
            const link = {
                id: `link-${idCount++}`,
                description: args.description,
                url: args.url,
            }
            links.push(link)
            return link
        }
    },
}
const resolvers = {
    Query: {
        info: () => `This is the API of a Hackernews Clone`,
        feed: () => links,
    },

    Link: {
        id: (parent) => parent.id,
        description: (parent) => parent.description,
        url: (parent) => parent.url,
    }
}

const server = new ApolloServer({
    typeDefs: false.readFileSync(
        path.join(__dirname, 'schema.graphql'),
        'utf8'
    ),
    resolvers,
})

server
    .listen()
    .then(({ url }) =>
        console.log(`Server is running on ${url}`)
    );