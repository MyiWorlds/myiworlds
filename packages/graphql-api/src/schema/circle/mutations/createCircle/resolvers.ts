import createCircle from './createCircle';
import { Context, ResolverMap } from '@myiworlds/types';
import { getDocumentById } from '../../../../services/firebase/firestore/queries';

export const resolvers: ResolverMap = {
  Mutation: {
    createCircle: async (
      _: null,
      args: {
        id: string;
        collection: 'circles';
        pii: boolean;
        parent: string;
        slug: string;
        public: boolean;
        passwordRequired: boolean;
        type: string;
        settings: string;
        rating: string;
        tags: [string];
        title: string;
        subtitle: string;
        description: string;
        media: string;
        icon: string;
        creator: string;
        owner: string;
        users: [string];
        editors: [string];
        dateCreated: any;
        dateUpdated: any;
        string: string;
        data: JSON;
        number: number;
        bigNumber: any;
        boolean: boolean;
        date: any;
        geoPoint: any;
        lines: [string];
      },
      context: Context,
    ) => {
      return createCircle(args, context);
    },
  },
  CreateCircleResponse: {
    createdCircle: async (response: any, _: null, context: Context) =>
      getDocumentById('circles', response.createdDocumentId, context),
    creator: async (response: any, _: null, context: Context) =>
      getDocumentById('users', response.contextProfileId, context),
  },
};
