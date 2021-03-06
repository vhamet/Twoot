const { GraphQLServer } = require('graphql-yoga');
const { formatError } = require('apollo-errors');

const { prisma } = require('./prisma-client/generated');

const Query = require('./resolvers/Query');
const Mutation = require('./resolvers/Mutation');
const Subscription = require('./resolvers/Subscription');
const User = require('./resolvers/User');
const Post = require('./resolvers/Post');
const Comment = require('./resolvers/Comment');
const Alert = require('./resolvers/Alert');
const Message = require('./resolvers/Message');

const isAuthenticatedMiddleware = require('./middleware/isAuthenticated');

const resolvers = {
  Query,
  Mutation,
  Subscription,
  User,
  Post,
  Comment,
  Alert,
  Message,
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

server.start(options, () =>
  console.log(`Server is running on http://localhost:4000`)
);
