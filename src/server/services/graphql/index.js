import { ApolloServer } from 'apollo-server-express';
import { makeExecutableSchema } from '@graphql-tools/schema';
import Resolvers from './resolvers';
import Schema from './schema';

export default utils => {
  const server = new ApolloServer({
    typeDefs: Schema,
    resolvers: Resolvers.call(utils),
    context: ({ req }) => req,
  });

  return server;
};
