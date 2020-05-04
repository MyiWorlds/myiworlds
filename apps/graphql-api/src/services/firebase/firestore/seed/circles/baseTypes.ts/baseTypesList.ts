import { CircleFactory } from '@myiworlds/factories';
import { googleCloud } from '@myiworlds/credentials';

export const baseTypesList = new CircleFactory().use('LINES').create({
  selectedProfileId: googleCloud.applicationCreatorProfile,
  header: {
    id: 'baseTypesList',
    title: 'Base content types',
    public: true,
    media: 'default-base-types-list-media',
  },
  lines: [
    'string',
    'number',
    'boolean',
    'date',
    'geoPoint',
    'lines',
    'line',
    'data',
  ],
});
