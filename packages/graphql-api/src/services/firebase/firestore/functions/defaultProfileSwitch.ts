import { Profile } from '@myiworlds/types';

const defaultProfileSwitch = (profile: Profile) => {
  const type = profile.id;

  const header = {
    id: profile.id || null,
    collection: profile.collection,
  };

  switch (type) {
    case 'PERMISSION_DENIED': {
      profile = {
        ...header,
        username: 'profile',
        public: false,
        canCreate: false,
        profileMedia: null,
        dateCreated: Date.now(),
        dateUpdated: Date.now(),
        level: null,
        rating: null,
        isDarkTheme: false,
        circleTypeOverrides: null,
        overrideCircleTypes: false,
        myTheme: null,
        homePublic: null,
        home: null,
        following: null,
        addToHistory: false,
        history: null,
      };
      break;
    }
    case 'DOES_NOT_EXIST':
    default: {
      profile = {
        ...header,
        username: 'unknown',
        public: false,
        canCreate: false,
        profileMedia: null,
        dateCreated: Date.now(),
        dateUpdated: Date.now(),
        level: null,
        rating: null,
        isDarkTheme: false,
        circleTypeOverrides: null,
        overrideCircleTypes: false,
        myTheme: null,
        homePublic: null,
        home: null,
        following: null,
        addToHistory: false,
        history: null,
      };
      break;
    }
  }
  return profile;
};

export default defaultProfileSwitch;
