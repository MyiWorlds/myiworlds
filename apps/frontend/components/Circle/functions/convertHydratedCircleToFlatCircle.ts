import { Circle, CircleHydrated } from '@myiworlds/types';
import {
  circleFields,
  circleListFields,
  profileFields,
  profileListFields,
  circleCloneFields,
} from './../../../constants/circleFieldsStrings';

export const convertHydratedCircleToFlatCircle = (
  circleHydrated: CircleHydrated,
): Circle => {
  const flatCircle: Circle = { id: '' };

  Object.keys(circleHydrated).forEach((field: keyof CircleHydrated) => {
    const isCircleField = circleFields.includes(field);
    const circleCloneField = circleCloneFields.includes(field);
    const isProfileField = profileFields.includes(field);
    const isCircleList = circleListFields.includes(field);
    const isProfileList = profileListFields.includes(field);

    if (
      (isCircleField || circleCloneField || isProfileField) &&
      circleHydrated[field] &&
      circleHydrated[field].id
    ) {
      flatCircle[field] = circleHydrated[field].id as string;
    } else if (
      (isCircleList || isProfileList) &&
      circleHydrated[field] &&
      circleHydrated[field].length
    ) {
      flatCircle[field] = circleHydrated[field].map(
        (item: any) => item.id,
      ) as string[];
    } else {
      flatCircle[field] = circleHydrated[field];
    }
  });

  return flatCircle;
};

export const convertAllNestedHydratedCircleToFlatCircle = (
  circleHydrated: CircleHydrated,
): Circle[] => {
  const flatCircles: Circle[] = [];
  const flatCircle: Circle = { id: '' };

  Object.keys(circleHydrated).forEach((field: keyof CircleHydrated) => {
    const isCircleField = circleFields.includes(field);
    const circleCloneField = circleCloneFields.includes(field);
    const isProfileField = profileFields.includes(field);
    const isCircleList = circleListFields.includes(field);
    const isProfileList = profileListFields.includes(field);

    if (
      (isCircleField || circleCloneField || isProfileField) &&
      circleHydrated[field] &&
      circleHydrated[field].id
    ) {
      flatCircles.push(
        ...convertAllNestedHydratedCircleToFlatCircle(circleHydrated[field]),
      );
      flatCircle[field] = circleHydrated[field].id as string;
    } else if (
      (isCircleList || isProfileList) &&
      circleHydrated[field] &&
      circleHydrated[field].length
    ) {
      flatCircle[field] = circleHydrated[field].map((item: any) => {
        flatCircles.push(...convertAllNestedHydratedCircleToFlatCircle(item));
        return item.id;
      }) as string[];
    } else {
      flatCircle[field] = circleHydrated[field];
    }
  });

  flatCircles.push(flatCircle);

  const result: Circle[] = [];
  flatCircles.forEach(elem => {
    const match = result.find(r => r.id === elem.id);
    if (match) {
      Object.assign(match, elem);
    } else {
      result.push(elem);
    }
  });
  return result;
};
