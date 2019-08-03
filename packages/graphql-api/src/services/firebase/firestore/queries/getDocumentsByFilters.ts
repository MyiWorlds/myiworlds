import { defaultCircleSwitch } from '../functions';
import { firestore, stackdriver } from '@myiworlds/cloud-services';
import { GraphQLResolveInfo } from 'graphql';
import { userCanView } from '../rules';
import {
  Context,
  IFilter,
  IOrderBy,
  IGetDocumentsByFiltersResponse,
} from '@myiworlds/types';
import graphqlFields = require('graphql-fields');

export default async function getDocumentsByFilters(
  collection: string,
  filters: IFilter[],
  orderBy: IOrderBy,
  numberOfResults: number,
  pageCursor: string | null,
  context: Context,
  info?: GraphQLResolveInfo,
  selectFields?: string[],
) {
  console.time('getDocumentsByFilters TTC');

  if (numberOfResults > 100) {
    numberOfResults = 100;
  }

  const response: IGetDocumentsByFiltersResponse = {
    type: 'QUERY',
    data: {
      collection,
      filters,
      orderBy,
      numberOfResults,
      cursor: pageCursor || null,
      hasMoreResults: false,
    },
    lines: [],
  };

  try {
    let query: any = firestore.collection(collection);

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

    query = await query.get().then((results: any) => {
      if (results.empty) {
        return response;
      }

      const data = results.docs.map((result: any) => {
        result = result.data();
        if (userCanView(result, context)) {
          response.lines.push(result);
        } else {
          result.type = 'PERMISSION_DENIED';
          response.lines.push(defaultCircleSwitch(result, context));
        }
        return result;
      });

      const lastItemFetched = data[data.length - 1][orderBy.property];
      response.data.cursor = lastItemFetched;
      if (data.length >= numberOfResults) {
        // Can do a check to see if another item exists here to prevent false positives
        response.data.hasMoreResults = true;
      }

      return response;
    });
  } catch (error) {
    stackdriver.report(error);
    response.lines = [];
  }
  console.timeEnd('getDocumentsByFilters TTC');
  return response;
}
