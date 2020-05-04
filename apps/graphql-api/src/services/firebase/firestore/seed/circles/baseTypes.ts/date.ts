import { CircleFactory } from '@myiworlds/factories';
import { googleCloud } from '@myiworlds/credentials';

export const date = new CircleFactory().use('DATE').create({
  selectedProfileId: googleCloud.applicationCreatorProfile,
  header: {
    id: 'date',
    title: 'Date',
    public: true,
    media: 'default-date-media',
  },
  date: Date.now(),
});
