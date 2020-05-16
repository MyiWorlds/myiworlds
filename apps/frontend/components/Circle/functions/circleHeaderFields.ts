import { Circle, Header } from '@myiworlds/types';

export const circleHeaderFields = (circle: Circle) => {
  const headerFields = [
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
    'media',
    'title',
    'subtitle',
    'description',
    'tags',
    'dateCreated',
    'dateUpdated',
    'creator',
    'owner',
    'viewers',
    'editors',
    'styles',
    'layouts',
  ];

  const header: any = {};

  headerFields.forEach((field: keyof Header) => {
    if (circle[field]) {
      header[field] = circle[field];
    }
  });

  return header as Header;
};
