import { CircleFactory } from '@myiworlds/factories';
import { googleCloud } from '@myiworlds/credentials';

export const line = new CircleFactory().use('LINE').create({
  selectedProfileId: googleCloud.applicationCreatorProfile,
  header: {
    id: 'line',
    title: 'Line',
    public: true,
  },
  line: '',
});
