import { allCircleFields } from './../constants/circleFieldsStrings';
import { atomFamily, selectorFamily } from 'recoil';
import { Circle } from '@myiworlds/types';

// Chnage to circle
export const circleWithId = atomFamily({
  key: `circle`,
  default: undefined as any,
});

export const circlePropertyState = selectorFamily({
  key: 'circle123',
  get: (queryParameters: { id: string; field: keyof Circle }) => ({ get }) => {
    const { id, field } = queryParameters;
    const circleField = get(circleWithId(id + field));
    if (circleField) {
      return circleField;
    }
  },
});

export const getAllCircleState = selectorFamily({
  key: 'whole-circle',
  get: (queryParameters: { id: string }) => ({ get }) => {
    const { id } = queryParameters;
    const circle = {};
    allCircleFields.forEach((field: keyof Circle) => {
      const circleFieldValue = get(circleWithId(id + field));
      if (circleFieldValue !== undefined) {
        circle[field] = circleFieldValue;
      }
    });
    return circle;
  },
});
