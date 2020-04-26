import { CircleFactory } from '@myiworlds/factories';
import { googleCloud } from '@myiworlds/credentials';

export const number = new CircleFactory().use('NUMBER').create({
  selectedProfileId: googleCloud.applicationCreatorProfile,
  header: {
    id: 'number',
    title: 'Number',
    public: true,
  },
  number: 0,
});
