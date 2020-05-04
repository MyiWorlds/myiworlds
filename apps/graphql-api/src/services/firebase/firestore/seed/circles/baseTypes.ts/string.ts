import { CircleFactory } from '@myiworlds/factories';
import { googleCloud } from '@myiworlds/credentials';

export const string = new CircleFactory().use('STRING').create({
  selectedProfileId: googleCloud.applicationCreatorProfile,
  header: {
    id: 'string',
    title: 'String',
    public: true,
    media: 'default-string-media',
  },
  string: '',
});
