import gql from 'graphql-tag';

const deleteUserTypeDefs = gql`
  type Mutation {
    deleteUser: DeleteUserResponse
  }

  type DeleteUserResponse {
    status: String!
    message: String!
    userDeleted: Boolean!
  }
`;

export default deleteUserTypeDefs;
