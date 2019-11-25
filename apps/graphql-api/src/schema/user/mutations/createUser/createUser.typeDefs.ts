import gql from 'graphql-tag';

const createUserTypeDefs = gql`
  type Mutation {
    createUser(id: ID!, email: String!, photoURL: String): CreateUserResponse
  }

  type CreateUserResponse {
    status: String
    message: String
    createdUser: User
  }
`;

export default createUserTypeDefs;
