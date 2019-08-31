import gql from 'graphql-tag';
import { LoggedInUserFragment } from './LoggedInUserFragment';

export const CREATE_USER = gql`
  mutation createUser($id: ID!, $email: String!) {
    createUser(id: $id, email: $email) {
      status
      message
      createdUser {
        ...LoggedInUser
      }
    }
  }
  ${LoggedInUserFragment}
`;
