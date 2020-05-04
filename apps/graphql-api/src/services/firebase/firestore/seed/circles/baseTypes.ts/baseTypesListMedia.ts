import { CircleFactory } from '@myiworlds/factories';
import { googleCloud } from '@myiworlds/credentials';

export const baseTypesListMedia = new CircleFactory()
  .use('MEDIA_FONT_ICON')
  .create({
    selectedProfileId: googleCloud.applicationCreatorProfile,
    header: {
      id: 'default-base-types-list-media',
      title: 'Default base types list media',
      public: true,
    },
    string: 'grade',
  });
