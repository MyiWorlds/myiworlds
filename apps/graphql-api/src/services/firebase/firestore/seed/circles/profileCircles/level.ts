import { CircleFactory } from '@myiworlds/factories';
import { googleCloud } from '@myiworlds/credentials';

export const level = new CircleFactory().use('EDGE').createCounterEdge({
  selectedProfileId: googleCloud.applicationCreatorProfile,
  header: {
    id: 'level',
    title: 'Level',
    public: true,
  },
});
