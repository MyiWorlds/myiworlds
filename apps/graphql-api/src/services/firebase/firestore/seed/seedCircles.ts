import createDocument from './../mutations/createDocument';
import { appProfile } from './profiles/appProfile';
import { baseTypesList } from './circles/baseTypes.ts/baseTypesList';
import { baseTypesListMedia } from './circles/baseTypes.ts/baseTypesListMedia';
import { boolean } from './circles/baseTypes.ts/boolean';
import { booleanMedia } from './circles/baseTypes.ts/booleanMedia';
import { Circle } from '@myiworlds/types';
import { circleUis } from './circles/profileCircles/circleUis';
import { context } from './adminContext';
import { data } from './circles/baseTypes.ts/data';
import { dataMedia } from './circles/baseTypes.ts/dataMedia';
import { date } from './circles/baseTypes.ts/date';
import { dateMedia } from './circles/baseTypes.ts/dateMedia';
import { defaultProfileMedia } from './circles/profileCircles/defaultProfileMedia';
import { FIRESTORE_COLLECTIONS, RESPONSE_CODES } from '@myiworlds/enums';
import { firestoreAdmin } from '@myiworlds/services';
import { following } from './circles/profileCircles/following';
import { geoPoint } from './circles/baseTypes.ts/geoPoint';
import { geoPointMedia } from './circles/baseTypes.ts/geoPointMedia';
import { history } from './circles/profileCircles/history';
import { home } from './circles/profileCircles/home';
import { level } from './circles/profileCircles/level';
import { line } from './circles/baseTypes.ts/line';
import { lineMedia } from './circles/baseTypes.ts/lineMedia';
import { lines } from './circles/baseTypes.ts/lines';
import { linesMedia } from './circles/baseTypes.ts/linesMedia';
import { number } from './circles/baseTypes.ts/number';
import { numberMedia } from './circles/baseTypes.ts/numberMedia';
import { publicHome } from './circles/profileCircles/publicHome';
import { rating } from './circles/profileCircles/rating';
import { string } from './circles/baseTypes.ts/string';
import { stringMedia } from './circles/baseTypes.ts/stringMedia';
import { theme } from './circles/profileCircles/theme';
import { updateDocumentById } from '../mutations';
import { UserProfileData } from '../../../../../../../libs/types/src/profile';

// On edges have default tags which you can then
// search based on PROFILES id + tag that is in parent (and on child)

export const circlesToCreate: Circle[] = [
  booleanMedia,
  boolean,
  dataMedia,
  data,
  dateMedia,
  date,
  geoPointMedia,
  geoPoint,
  lineMedia,
  line,
  linesMedia,
  lines,
  numberMedia,
  number,
  stringMedia,
  string,
  baseTypesListMedia,
  baseTypesList,
  rating,
  level,
  theme,
  history,
  following,
  circleUis,
  home,
  publicHome,
  defaultProfileMedia,
];

const profilesToCreate: UserProfileData[] = [appProfile];

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

    // Data not returned for now because lazy
    await Promise.all(
      profilesToCreate.map(async (profile: UserProfileData) => {
        if (profile.id) {
          const documentExists = await firestoreAdmin
            .collection(FIRESTORE_COLLECTIONS.PROFILES)
            .doc(profile.id)
            .get()
            .then((res: any) => res.data());

          if (documentExists) {
            await updateDocumentById(profile, context, false, false);
            // edited.push(profile.id);
          } else {
            await createDocument(profile, context, true);
            // created.push(profile.id);
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
