import graphqlFields from 'graphql-fields';
import { CIRCLE_TYPES } from '@myiworlds/enums';
import { factoriesSwitch } from '@myiworlds/factories';
import { firestoreAdmin, stackdriver } from '@myiworlds/services';
import { GraphQLResolveInfo } from 'graphql';
import { RESPONSE_CODES } from '@myiworlds/enums';
import { userCanView } from '@myiworlds/helper-functions';
import {
  Context,
  Filter,
  OrderBy,
  FirestoreCollectionTypes,
  Circle,
  PublicProfileData,
  PublicProfileCloneData,
} from '@myiworlds/types';

export interface GetDocumenByFiltersResponse {
  status: string;
  hasMoreResults: boolean;
  cursor: string | null;
  results: Circle[] | PublicProfileData[] | PublicProfileCloneData[];
}

export default async function getDocumentsByFilters(
  collection: FirestoreCollectionTypes,
  filters: Filter[],
  orderBy: OrderBy,
  numberOfResults: number,
  pageCursor: string | null,
  context: Context,
  info?: GraphQLResolveInfo,
  selectFields?: string[],
) {
  if (numberOfResults > 100) {
    numberOfResults = 100;
  }

  const response: GetDocumenByFiltersResponse = {
    status: RESPONSE_CODES.SUCCESS,
    cursor: pageCursor || null,
    hasMoreResults: false,
    results: [],
  };

  try {
    let query: any = firestoreAdmin.collection(collection);

    if (filters) {
      filters.forEach(filter => {
        query = query.where(filter.property, filter.condition, filter.value);
      });
    }

    let fieldsToGet: string[] | null = null;

    if (selectFields && selectFields.length) {
      fieldsToGet = selectFields;
    } else if (info) {
      const fieldsWithoutTypeName = graphqlFields(
        info,
        {},
        { excludedFields: ['__typename'] },
      );
      fieldsToGet = Object.keys(fieldsWithoutTypeName).map(
        (property: string) => property,
      );
    }

    if (fieldsToGet) {
      const arr = [...fieldsToGet, 'creator', 'editors', 'viewers', 'type'];
      query = query.select(...arr);
    }

    if (pageCursor) {
      // Need to update this to pass in value for sort order
      query = query
        .orderBy(orderBy.property, orderBy.ascending ? 'asc' : 'desc')
        .startAfter(pageCursor)
        .limit(numberOfResults);
    } else {
      query = query
        .orderBy(orderBy.property, orderBy.ascending ? 'asc' : 'desc')
        .limit(numberOfResults);
    }

    const qu = await query.get();

    if (qu.empty) {
      return response;
    }

    const data = qu.docs.map((result: any) => {
      result = result.data();
      if (userCanView(result, context)) {
        response.results.push(result);
      } else {
        result.type = 'PERMISSION_DENIED';
        const deniedItem = factoriesSwitch(result)
          .use(CIRCLE_TYPES.PERMISSION_DENIED)
          .create();

        // Super annoying it keeps thinking it returns a unique type from permission denied
        response.results.push(deniedItem as any);
      }
      return result;
    });

    const lastItemFetched = data[data.length - 1][orderBy.property];
    response.cursor = lastItemFetched;
    if (data.length >= numberOfResults) {
      // Can do a check to see if another item exists here to prevent false positives
      response.hasMoreResults = true;
    }
  } catch (error) {
    response.status = RESPONSE_CODES.ERROR;
    stackdriver.report(error);
    response.results = [];
    return response;
  }
  return response;
}
