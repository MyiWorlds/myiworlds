import * as GraphQLBigInt from 'graphql-bigint';
import * as GraphQLJSON from 'graphql-type-json';

const sharedResolvers = {
  JSON: GraphQLJSON,
  BigInt: GraphQLBigInt
};

export default sharedResolvers;
