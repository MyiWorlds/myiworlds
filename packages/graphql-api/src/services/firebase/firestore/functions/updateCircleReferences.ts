import { Context } from '@myiworlds/types';
import { getDocumentsByFilters } from '../queries';

const updateCircleReferences = async (id: string, context: Context) => {
  const linesReferences = await getDocumentsByFilters(
    'circles',
    [
      {
        property: 'cached',
        condition: '==',
        value: true,
      },
      {
        property: 'lines',
        condition: 'array-contains',
        value: id,
      },
    ],
    {
      property: 'dateUpdated',
      ascending: true,
    },
    300,
    null,
    context,
    undefined,
    ['id'],
  );

  console.log(linesReferences);

  const lineReferences = await getDocumentsByFilters(
    'circles',
    [
      {
        property: 'cached',
        condition: '==',
        value: true,
      },
      {
        property: 'line',
        condition: '==',
        value: id,
      },
    ],
    {
      property: 'dateUpdated',
      ascending: true,
    },
    300,
    null,
    context,
    undefined,
    ['id'],
  );
  console.log(lineReferences);
  return;
};

export default updateCircleReferences;
