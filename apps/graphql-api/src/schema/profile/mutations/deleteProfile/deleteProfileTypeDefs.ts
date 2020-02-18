import gql from 'graphql-tag';

const deleteProfileTypeDefs = gql`
  type Mutation {
    deleteProfile(id: String!): DeleteProfileResponse
  }

  type DeleteProfileResponse {
    status: String
    message: String
    profileIdToDelete: String
    profileDeleted: Boolean
    numberOfPiiCircles: Int
    piiCirclesDeleted: Boolean
    numberOfPiiCircleClones: Int
    piiCircleClonesDeleted: Boolean
    numberOfAppCreatedCirclesForProfile: Int
    appCreatedCirclesForProfileDeleted: Boolean
    numberOfAppCreatedCircleClonesForProfile: Int
    appCreatedCircleClonesForProfileDeleted: Boolean
  }
`;

export default deleteProfileTypeDefs;
