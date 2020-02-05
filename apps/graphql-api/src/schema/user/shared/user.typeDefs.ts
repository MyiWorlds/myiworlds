import gql from 'graphql-tag';

const userTypeDefs = gql`
  type User {
    id: ID!
    collection: String
    email: String
    photoURL: String
    dateCreated: BigInt
    dateUpdated: BigInt
    isSystemAdmin: Boolean
  }
`;

export default userTypeDefs;
