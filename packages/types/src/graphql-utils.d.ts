import { Context } from './context';
import { GraphQLResolveInfo } from 'graphql';

export type Resolver = (
  parent: any,
  args: any,
  context: Context,
  info: GraphQLResolveInfo,
  selectFields: string[],
) => any;

export interface ResolverMap {
  [key: string]: {
    [key: string]: Resolver;
  };
}
