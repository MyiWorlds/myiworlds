import gql from 'graphql-tag';

export const LoggedInUserFragment = gql`
  fragment LoggedInUser on User {
    email
    id
    email
    canCreate
    dateCreated
    dateUpdated
    profiles {
      id
      username
    }
    selectedProfile {
      id
      collection
      public
      username
      canCreate
      profileMedia {
        id
      }
      dateCreated
      dateUpdated
      level {
        id
      }
      rating {
        id
      }
      isDarkTheme
      circleTypeOverrides {
        id
      }
      overrideCircleTypes
      myTheme {
        id
      }
      homePublic {
        id
      }
      home {
        id
      }
      following {
        id
      }
      addToHistory
      history {
        id
      }
    }
  }
`;
