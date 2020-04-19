import { CircleFactory } from '@myiworlds/factories';
import { googleCloud } from '@myiworlds/credentials';

export const following = new CircleFactory().use('EDGE').createCounterEdge({
  selectedProfileId: googleCloud.applicationCreatorProfile,
  header: {
    id: 'following',
    title: 'Following',
    public: true,
  },
});
