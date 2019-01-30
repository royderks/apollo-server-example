const { ApolloServer, gql } = require("apollo-server");
const _ = require("lodash");

const resolvers = require("./resolvers.js");
const typeDefs = require("./typeDefs.js");

const server = new ApolloServer({
  typeDefs,
  resolvers
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
