import hasFetchedEnough from './hasFetchedEnough';
import removeAllInvalid from './removeAllInvalid';
import { Context, IFilter, SearchCircle } from '@myiworlds/types';
import { getDocumentsByFilters } from '../../../../../services/firebase/firestore/queries';

const getData = async (
  collection: string,
  filters: IFilter[],
  numberOfResults: number,
  cursor: string,
  context: Context,
) => {
  const circle = await getDocumentsByFilters(
    collection,
    filters,
    {
      property: 'dateUpdated',
      ascending: true,
    },
    numberOfResults,
    cursor,
    context,
  );

  return circle;
};

export default async function getEntitiesAndRemoveInvalid(
  circle: SearchCircle,
  context: Context,
) {
  const requestedNumberOfResults = circle.data.numberOfResults;
  const cursor =
    circle.data.cursor && circle.data.cursor ? circle.data.cursor : null;

  const query = await getData(
    circle.data.collection,
    circle.data.filters.searchConditions,
    requestedNumberOfResults,
    cursor,
    context,
  );

  const resultsFiltered = removeAllInvalid(query.lines);

  circle.lines = circle.lines
    ? circle.lines.concat(resultsFiltered)
    : resultsFiltered;

  circle.data.cursor = query.data.cursor;

  const fetchMore = hasFetchedEnough(circle, requestedNumberOfResults);
  let numberOfRetries = 0;
  const maxNumberOfRetries = 5;

  while (fetchMore && numberOfRetries < maxNumberOfRetries) {
    numberOfRetries++;

    const amountToRefetch = requestedNumberOfResults - circle.lines.length;

    const getMoreData = await getData(
      circle.data.collection,
      circle.data.filters.searchConditions,
      amountToRefetch,
      circle.data.cursor,
      context,
    );
    const resultsFiltered2 = removeAllInvalid(getMoreData.lines);

    circle.lines = circle.lines
      ? circle.lines.concat(resultsFiltered2)
      : resultsFiltered2;

    circle.data.cursor = query.data.cursor;
  }

  const numberOfResults = circle.lines.length;
  // hasMoreResults is not in firestores query
  circle.data.hasMoreResults =
    (numberOfRetries >= maxNumberOfRetries &&
      numberOfResults >= requestedNumberOfResults) ||
    numberOfResults >= requestedNumberOfResults;

  return circle;
}
