import { CircleFactory } from '@myiworlds/factories';
import { googleCloud } from '@myiworlds/credentials';

export const geoPoint = new CircleFactory().use('GEO_POINT').create({
  selectedProfileId: googleCloud.applicationCreatorProfile,
  header: {
    id: 'geoPoint',
    title: 'Geo Point',
    public: true,
  },
  geoPoint: '',
});
