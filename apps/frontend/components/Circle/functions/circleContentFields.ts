import { Circle, Content } from '@myiworlds/types';

export const circleContentFields = (circle: Circle) => {
  const contentFields = [
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

  const content: any = {};

  contentFields.forEach((field: keyof Content) => {
    if (circle[field]) {
      content[field] = circle[field];
    }
  });

  return content as Content;
};
