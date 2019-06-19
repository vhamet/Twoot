const { GraphQLServer } = require('graphql-yoga');
const { prisma } = require('./prisma-client/generated');
const Mutation = require('./resolvers/Mutation');

const resolvers = {
  Mutation
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
