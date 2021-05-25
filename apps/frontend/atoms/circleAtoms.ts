import { allCircleFields } from '../constants/circleFieldsStrings';
import { atom, atomFamily, selectorFamily } from 'recoil';
import { Circle } from '@myiworlds/types';

export const selectedCircleFieldEditingAtom = atom({
  key: `selected-circle-field-editing`,
  default: null as string | null,
});

export const circleFieldIsSelectedSelector = selectorFamily({
  key: 'circleFieldIsSelected',
  get: (queryParameters: { property: string }) => ({ get }) => {
    const selectedProperty = get(selectedCircleFieldEditingAtom);
    return selectedProperty === queryParameters.property;
  },
});

export const circlePropertyValueByIdAndPropertyAtom = atomFamily({
  key: `circle`,
  default: undefined as any,
});

export const circlePropertyState = selectorFamily({
  key: 'circle123',
  get: (queryParameters: { id: string; field: keyof Circle }) => ({ get }) => {
    const { id, field } = queryParameters;
    const circleField = get(circlePropertyValueByIdAndPropertyAtom(id + field));
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
      const circleFieldValue = get(
        circlePropertyValueByIdAndPropertyAtom(id + field),
      );
      if (circleFieldValue !== undefined) {
        circle[field] = circleFieldValue;
      }
    });
    return circle;
  },
});
