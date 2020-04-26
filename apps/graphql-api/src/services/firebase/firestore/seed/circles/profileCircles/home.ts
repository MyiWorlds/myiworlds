import { CircleFactory } from '@myiworlds/factories';
import { googleCloud } from '@myiworlds/credentials';

export const home = new CircleFactory().use('EDGE').createCounterEdge({
  selectedProfileId: googleCloud.applicationCreatorProfile,
  header: {
    id: 'home',
    title: 'My Home',
    public: true,
  },
});
