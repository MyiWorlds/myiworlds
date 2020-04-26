import { CircleFactory } from '@myiworlds/factories';
import { googleCloud } from '@myiworlds/credentials';

export const data = new CircleFactory().use('DATA').create({
  selectedProfileId: googleCloud.applicationCreatorProfile,
  header: {
    id: 'data',
    title: 'Data',
    public: true,
  },
  data: {},
});
