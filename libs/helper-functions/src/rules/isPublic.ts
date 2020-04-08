import { Circle } from '@myiworlds/types';

export const isPublic = (circle: Circle) => {
  return circle && circle.public;
};
