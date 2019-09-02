import circles from './circles/circles';
import profile from './profiles/profiles';
import { Circle, Context, Property } from '@myiworlds/types';
import { typesList } from './circles/typesList';
import { updateDocumentById } from '../mutations';

const appCreatorsContext: Context = {
  userId: 'USER-APP',
  selectedProfileId: profile.username,
  validated: true,
  addToHistory: false,
  profileHistoryId: 'PROFILE-APP', // whats with this id
};

const propertiesToIgnore = [
  'id',
  'cached',
  'cache',
  'collection',
  'pii',
  'parent',
  'copiedFrom',
  'slug',
  'passwordRequired',
];

const updateCircleTypes = () => {
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
      console.log(
        await updateDocumentById(circle, appCreatorsContext, false, false),
      );
    } catch (error) {
      console.error('updateTypes had an error', error);
    }
  });
};

updateCircleTypes();
