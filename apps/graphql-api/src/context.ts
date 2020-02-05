import * as cookie from 'cookie';
import getUserId from './services/firebase/authentication/getUserId';
import { ExpressContext } from 'apollo-server-express/dist/ApolloServer';

const Context = async (req: ExpressContext['req']) => {
  try {
    const cookies = cookie.parse(
      req.headers.cookies ? req.headers.cookies.toString() : '',
    );
    const context = {
      userId: await getUserId(cookies.token),
    };

    return context;
  } catch (error) {
    console.error('Context had an error', '\n', error);
    return null;
  }
};

export default Context;
