import { CircleFactory } from '@myiworlds/factories';
import { googleCloud } from '@myiworlds/credentials';

export const history = new CircleFactory().use('EDGE').create({
  selectedProfileId: googleCloud.applicationCreatorProfile,
  header: {
    id: 'history',
    title: 'History',
    public: true,
  },
});
