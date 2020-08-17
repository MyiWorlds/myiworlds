import { Circle } from '@myiworlds/types';

export const circleFieldsFilter = (circleToUpdate: any) => {
  const allowedFields: (keyof Circle)[] = [
    'id',
    'collection',
    'type',
    'parent',
    'cached',
    'cache',
    'pii',
    'copiedFrom',
    'copiedFromClone',
    'autoUpdate',
    'slug',
    'public',
    'passwordRequired',
    'tags',
    'title',
    'subtitle',
    'description',
    'media',
    'creator',
    'owner',
    'viewers',
    'editors',
    'ui',
    'layouts',
    'dateCreated',
    'dateUpdated',
    'clonedFrom',
    'key',
    'string',
    'data',
    'number',
    'bigNumber',
    'boolean',
    'date',
    'geoPoint',
    'line',
    'lines',
  ];
  const circle: any = {};

  allowedFields.forEach((field: string) => {
    if (circleToUpdate[field] !== undefined) {
      circle[field] = circleToUpdate[field];
    }
  });

  return circle as Circle;
};
