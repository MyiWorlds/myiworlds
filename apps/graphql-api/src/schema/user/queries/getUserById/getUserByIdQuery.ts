import getUserById from './getUserById';
import UserType from '../../UserType';
import { Context } from '@myiworlds/types';

const getUserByIdQuery = {
  name: 'GetUserById',
  type: UserType,
  resolve: (query: null, args: {}, context: Context) => {
    console.log('context', context)
    return getUserById(context.userId)
  },
};

export default getUserByIdQuery;
