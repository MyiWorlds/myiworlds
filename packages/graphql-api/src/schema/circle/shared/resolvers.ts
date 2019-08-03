import { stackdriver } from '@myiworlds/cloud-services';
import { Context, ResolverMap } from '@myiworlds/types';

export const resolvers: ResolverMap = {
  Circle: {
    parent: async (circle: any, _: null, context: Context) => {
      if (circle.parent) {
        return context.circleLoader.load(circle.parent);
      } else {
        return null;
      }
    },
    clonedFrom: async (circle: any, _: null, context: Context) => {
      if (circle.clonedFrom) {
        return context.circleLoader.load(circle.clonedFrom);
      } else {
        return null;
      }
    },
    rating: async (circle: any, _: null, context: Context) => {
      if (circle.rating) {
        return context.circleLoader.load(circle.rating);
      } else {
        return null;
      }
    },
    settings: async (circle: any, _: null, context: Context) => {
      if (circle.settings) {
        return context.circleLoader.load(circle.settings);
      } else {
        return null;
      }
    },
    media: async (circle: any, _: null, context: Context) => {
      if (circle.media) {
        return context.circleLoader.load(circle.media);
      } else {
        return null;
      }
    },
    creator: async (circle: any, _: null, context: Context) => {
      if (circle.creator) {
        return context.profileLoader.load(circle.creator);
      } else {
        return null;
      }
    },
    owner: async (circle: any, _: null, context: Context) => {
      if (circle.owner) {
        return context.profileLoader.load(circle.owner);
      } else {
        return null;
      }
    },
    viewers: async (circle: any, _: null, context: Context) => {
      if (circle.viewers) {
        return context.profileLoader.loadMany(circle.viewers);
      } else {
        return [];
      }
    },
    editors: async (circle: any, _: null, context: Context) => {
      if (circle.editors) {
        return context.profileLoader.loadMany(circle.editors);
      } else {
        return [];
      }
    },
    line: async (circle: any, _: null, context: Context) => {
      if (circle.line) {
        return context.circleLoader.load(circle.line);
      } else {
        return null;
      }
    },
    lines: async (circle: any, _: null, context: Context) => {
      if (circle.lines) {
        if (typeof circle.lines[0] === 'string') {
          try {
            return context.circleLoader.loadMany(circle.lines);
          } catch (error) {
            stackdriver.report(error);
          }
        } else {
          return circle.lines;
        }
      } else {
        return [];
      }
    },
  },
};
