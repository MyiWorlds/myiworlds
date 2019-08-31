import gql from 'graphql-tag';
import { LoggedInUserFragment } from './LoggedInUserFragment';

export const GET_USER = gql`
  query getUserById {
    getUserById {
      ...LoggedInUser
    }
  }
  ${LoggedInUserFragment}
`;
