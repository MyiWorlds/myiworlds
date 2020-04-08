import { CircleFactory } from '@myiworlds/factories';
import { googleCloud } from '@myiworlds/credentials';

export const publicHome = new CircleFactory().use('EDGE').createCounterEdge({
  selectedProfileId: googleCloud.applicationCreatorProfile,
  header: {
    id: 'public-home',
    title: 'Home',
    public: true,
  },
});
