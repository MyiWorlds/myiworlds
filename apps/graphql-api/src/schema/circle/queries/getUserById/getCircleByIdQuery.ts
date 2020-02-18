import CircleType from '../../CircleType';
import getCircleById from './getCircleById';
import { Context } from '@myiworlds/types';

const getCircleByIdQuery = {
  name: 'GetCircleById',
  type: CircleType,
  resolve: (query: null, args: {}, context: Context) => getCircleById(context.userId),
};

export default getCircleByIdQuery;
