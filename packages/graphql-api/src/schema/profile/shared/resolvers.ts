import { Context, ResolverMap } from '@myiworlds/types';

export const resolvers: ResolverMap = {
  Profile: {
    profileMedia: async (profile: any, _: null, context: Context) => {
      if (profile.profileMedia && profile.profileMedia !== '') {
        return context.circleLoader.load(profile.profileMedia);
      } else {
        return null;
      }
    },
    level: async (profile: any, _: null, context: Context) => {
      if (profile.level) {
        return context.circleLoader.load(profile.level);
      } else {
        return null;
      }
    },
    rating: async (profile: any, _: null, context: Context) => {
      if (profile.rating) {
        return context.circleLoader.load(profile.rating);
      } else {
        return null;
      }
    },
    circleTypeOverrides: async (profile: any, _: null, context: Context) => {
      if (profile.circleTypeOverrides) {
        return context.circleLoader.load(profile.circleTypeOverrides);
      } else {
        return null;
      }
    },
    myTheme: async (profile: any, _: null, context: Context) => {
      if (profile.myTheme) {
        return context.circleLoader.load(profile.myTheme);
      } else {
        return null;
      }
    },
    homePublic: async (profile: any, _: null, context: Context) => {
      if (profile.homePublic) {
        return context.circleLoader.load(profile.homePublic);
      } else {
        return null;
      }
    },
    home: async (profile: any, _: null, context: Context) => {
      if (profile.home) {
        return context.circleLoader.load(profile.home);
      } else {
        return null;
      }
    },
    following: async (profile: any, _: null, context: Context) => {
      if (profile.following) {
        return context.circleLoader.load(profile.following);
      } else {
        return null;
      }
    },
    history: async (profile: any, _: null, context: Context) => {
      if (profile.history) {
        return context.circleLoader.load(profile.history);
      } else {
        return null;
      }
    },
  },
};
