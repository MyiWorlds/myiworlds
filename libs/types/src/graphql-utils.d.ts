import { GraphQLResolveInfo } from 'graphql';
// import { Context } from './context';

export type Resolver = (
  parent: any,
  args: any,
  // context: Context,
  context: any,
  info: GraphQLResolveInfo,
  selectFields: string[],
) => any;

export interface ResolverMap {
  [key: string]: {
    [key: string]: Resolver;
  };
}
