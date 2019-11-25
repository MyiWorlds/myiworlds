import { ResolverMap } from '@myiworlds/types';

const userResolvers: ResolverMap = {
  User: {
    // Put your custom resolvers here.
    // Example if a user had profiles:
    //   profiles: async (user: User) => {
    //     if (!user.profiles.length) {
    //       return null;
    //     }
    //     try {
    //       if (user.profiles.length) {
    //         const docIds: any = user.profiles.map((profileId: string) => {
    //           return firestore.doc(`profiles/${profileId}`);
    //         });
    //         const getDocuments = await firestore
    //           .getAll(...docIds)
    //           .then((circles: any[]) => {
    //             return circles.map((circle: any) => circle.data());
    //           });
    //         return getDocuments;
    //       }
    //     } catch (error) {
    //       stackdriver.report(error);
    //       return null;
    //     }
    //   },
  },
};

export default userResolvers;
