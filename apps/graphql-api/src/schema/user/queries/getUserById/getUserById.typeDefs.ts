import gql from 'graphql-tag';

const getUserByIdTypeDefs = gql`
  type Query {
    getUserById: User
  }
`;

export default getUserByIdTypeDefs;
