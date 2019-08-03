import circles from '../../../../schema/circle/seed/circles';
import profile from '../../../../schema/profile/seed/profile';
import { Circle, Context, Property } from '@myiworlds/types';
import { createDocument } from '../mutations';
import { typesList } from '../../../../schema/circle/seed/typesList';

const appCreatorsContext: Context = {
  userId: 'USER-APP',
  selectedProfileId: profile.username,
  validated: true,
  addToHistory: false,
  profileHistoryId: 'PROFILE-APP',
};

const propertiesToIgnore = [
  'id',
  'cached',
  'cache',
  'collection',
  'settings',
  'pii',
  'passwordRequired',
];

const createCircleTypes = () => {
  const allCirclesToCreate: Circle[] = [...circles, ...typesList];

  allCirclesToCreate.map(circle => {
    const propertiesUsed = Object.keys(circle);

    circle.collection = 'circles';
    circle.creator = profile.username;
    circle.owner = profile.username;
    // Take all the created properties and add them to properties
    circle.properties = propertiesUsed.filter(
      property => !propertiesToIgnore.includes(property),
    ) as Property[];
  });

  allCirclesToCreate.forEach(async circle => {
    try {
      console.log(await createDocument(circle, appCreatorsContext));
    } catch (error) {
      console.error(error);
    }
  });
};

createCircleTypes();
