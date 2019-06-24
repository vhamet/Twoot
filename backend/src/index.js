const { GraphQLServer } = require('graphql-yoga');
const { prisma } = require('./prisma-client/generated');
const Query = require('./resolvers/Query');
const Mutation = require('./resolvers/Mutation');
const User = require('./resolvers/User');
const Post = require('./resolvers/Post');

const resolvers = {
  Query,
  Mutation,
  User,
  Post,
};

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: request => ({
    ...request,
    prisma
  })
});
server.use(function(req,res,next) {
  // if (req.body.query) {
  //   console.log(`${req.body.query}`);
  // }
  next();
});

server.start(() => console.log(`Server is running on http://localhost:4000`));
