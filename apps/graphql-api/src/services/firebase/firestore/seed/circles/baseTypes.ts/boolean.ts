import { CircleFactory } from '@myiworlds/factories';
import { googleCloud } from '@myiworlds/credentials';

export const boolean = new CircleFactory().use('BOOLEAN').create({
  selectedProfileId: googleCloud.applicationCreatorProfile,
  header: {
    id: 'boolean',
    title: 'Boolean',
    public: true,
    media: 'default-boolean-media',
  },
  boolean: false,
});
