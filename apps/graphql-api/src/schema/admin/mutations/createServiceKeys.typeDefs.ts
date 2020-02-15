import gql from 'graphql-tag';

const createServiceKeysTypeDefs = gql`
  type Mutation {
    createServiceKeys: CreateServiceKeysResponse!
  }

  type CreateServiceKeysResponse {
    totalCreated: Int!
    wasSuccessful: Boolean!
  }
`;

export default createServiceKeysTypeDefs;
