import { CircleFactory } from '@myiworlds/factories';
import { googleCloud } from '@myiworlds/credentials';

export const rating = new CircleFactory().use('EDGE').createCounterEdge({
  selectedProfileId: googleCloud.applicationCreatorProfile,
  header: {
    id: 'rating',
    title: 'Rating',
    public: true,
  },
});
