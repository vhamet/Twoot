const { GraphQLServer } = require('graphql-yoga');
const { formatError } = require('apollo-errors');

const { prisma } = require('./prisma-client/generated');

const Query = require('./resolvers/Query');
const Mutation = require('./resolvers/Mutation');
const User = require('./resolvers/User');
const Post = require('./resolvers/Post');

const isAuthenticatedMiddleware = require('./middleware/isAuthenticated');

const resolvers = {
  Query,
  Mutation,
  User,
  Post
};

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: request => ({
    ...request,
    prisma
  })
});

server.use(isAuthenticatedMiddleware);

const options = {
  formatError
};

server.start(options, () => console.log(`Server is running on http://localhost:4000`));
