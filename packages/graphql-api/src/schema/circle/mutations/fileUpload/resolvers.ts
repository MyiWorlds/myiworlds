import { buckets, cloudStorage, firestore } from '@myiworlds/cloud-services';
import {
  Context,
  Environment,
  Profile,
  ResolverMap
} from '@myiworlds/types';

export const resolvers: ResolverMap = {
  Mutation: {
    fileUpload: async (_, { file }, context: Context) => {
      const {
        createReadStream,
        filename,
        mimetype,
      }: {
        filename: string;
        createReadStream: any;
        mimetype: string;
      } = await file;

      const profileRef = firestore
        .collection('profiles')
        .doc(context.selectedProfileId);
      const requestingProfile:
      | Profile
      | undefined = await profileRef.get().then(item => item.data());

      if (
        !requestingProfile ||
        (requestingProfile && !requestingProfile.canCreate)
      ) {
        // Person is no longer allowed to save, return
        return { url: '', sizes: '' };
      }

      const environment = process.env.NODE_ENV as Environment;
      const fileRef = cloudStorage
        .bucket(buckets[environment].image.public)
        .file(`${filename}`);

      return new Promise(res =>
        createReadStream()
          .pipe(
            fileRef.createWriteStream({
              resumable: false,
              // gzip: true,
              contentType: mimetype,
            }),
          )
          .on('finish', async () => {
            const createSizeUrl = (size: number) => {
              return `https://storage.googleapis.com/${buckets[environment].image.public}/_gsis_${size}_${fileRef.id}`;
            };

            const sizes = [64, 124, 256, 480, 720, 1280, 3840].map(size =>
              createSizeUrl(size),
            );

            res({
              url: `https://storage.googleapis.com/${buckets[environment].image.public}/${fileRef.id}`,
              sizes,
            });
          }),
      );
    },
  },
};
