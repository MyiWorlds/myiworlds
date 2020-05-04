import { CircleFactory } from '@myiworlds/factories';
import { googleCloud } from '@myiworlds/credentials';

export const keyValue = new CircleFactory().use('KEY_VALUE').create({
  selectedProfileId: googleCloud.applicationCreatorProfile,
  header: {
    id: 'keyValue',
    title: 'Key Value',
    public: true,
    media: 'default-keyvalue-media',
  },
  key: '',
  string: '',
});
