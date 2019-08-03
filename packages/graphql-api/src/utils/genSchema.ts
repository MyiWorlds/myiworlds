import * as fs from 'fs';
import * as glob from 'glob';
import * as path from 'path';
import { makeExecutableSchema } from 'graphql-tools';
import { mergeResolvers, mergeTypes } from 'merge-graphql-schemas';

export const genSchema = () => {
  const pathToSchema = path.join(__dirname, '../schema');
  const graphqlTypes = glob
    .sync(`${pathToSchema}/**/*.graphql`)
    .map(x => fs.readFileSync(x, { encoding: 'utf8' }));

  const resolvers = glob
    .sync(`${pathToSchema}/**/resolvers.?s`)
    .map(resolver => require(resolver).resolvers);

  return makeExecutableSchema({
    typeDefs: mergeTypes(graphqlTypes),
    resolvers: mergeResolvers(resolvers),
  });
};
