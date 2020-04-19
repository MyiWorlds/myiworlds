import createDocument from './../mutations/createDocument';
import { Circle } from '@myiworlds/types';
import { circleUIs } from './circles/profileCircles/circleUIs';
import { context } from './adminContext';
import { defaultProfileMedia } from './circles/profileCircles/defaultProfileMedia';
import { FIRESTORE_COLLECTIONS, RESPONSE_CODES } from '@myiworlds/enums';
import { firestoreAdmin } from '@myiworlds/services';
import { following } from './circles/profileCircles/following';
import { history } from './circles/profileCircles/history';
import { home } from './circles/profileCircles/home';
import { level } from './circles/profileCircles/level';
import { publicHome } from './circles/profileCircles/publicHome';
import { rating } from './circles/profileCircles/rating';
import { theme } from './circles/profileCircles/theme';
import { updateDocumentById } from '../mutations';

// On edges have default tags which you can then
// search based on parent id + tag that is in parent (and on child)

export const circlesToCreate: Circle[] = [
  rating,
  level,
  theme,
  history,
  following,
  circleUIs,
  home,
  publicHome,
  defaultProfileMedia,
];

export const seedCircles = async () => {
  try {
    const created: string[] = [];
    const edited: string[] = [];

    await Promise.all(
      circlesToCreate.map(async (circle: Circle) => {
        if (circle.id) {
          const documentExists = await firestoreAdmin
            .collection(FIRESTORE_COLLECTIONS.CIRCLES)
            .doc(circle.id)
            .get()
            .then((res: any) => res.data());

          if (documentExists) {
            await updateDocumentById(circle, context, false, false);
            edited.push(circle.id);
          } else {
            await createDocument(circle, context, true);
            created.push(circle.id);
          }
        }
        return;
      }),
    );

    return {
      status: RESPONSE_CODES.SUCCESS,
      message: 'I created or updated the circles.',
      created,
      edited,
    };
  } catch (error) {
    return {
      status: RESPONSE_CODES.ERROR,
      message: 'I had an error creating those.',
      created: [],
      edited: [],
    };
  }
};
