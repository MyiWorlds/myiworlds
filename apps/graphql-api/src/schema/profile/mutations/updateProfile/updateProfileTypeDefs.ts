import gql from 'graphql-tag';

const updateProfileTypeDefs = gql`
  input UpdateProfileInput {
    id: ID!
    public: Boolean
    username: String
    canCreate: Boolean
    profileMedia: String
    level: String
    rating: String
    isDarkTheme: Boolean
    circleTypeOverrides: String
    overrideStringTypes: Boolean
    myTheme: String
    homePublic: String
    home: String
    following: String
    addToHistory: Boolean
    history: String
  }

  type Mutation {
    updateProfile(profile: UpdateProfileInput): UpdateProfileResponse
  }

  type UpdateProfileResponse {
    status: String
    message: String
    updatedProfile: Profile
  }
`;

export default updateProfileTypeDefs;
