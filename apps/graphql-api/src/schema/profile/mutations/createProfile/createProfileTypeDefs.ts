import gql from 'graphql-tag';

const createProfileTypeDefs = gql`
  type Mutation {
    createProfile(username: String!): CreateProfileResponse
  }

  type CreateProfileResponse {
    status: String
    message: String
    createdProfile: Profile
  }
`;

export default createProfileTypeDefs;
