import { CircleFactory } from '@myiworlds/factories';
import { googleCloud } from '@myiworlds/credentials';

export const circleUis = new CircleFactory().use('EDGE').create({
  selectedProfileId: googleCloud.applicationCreatorProfile,
  header: {
    id: 'circle-uis',
    title: 'Circle user interface overrides',
    public: true,
  },
});
