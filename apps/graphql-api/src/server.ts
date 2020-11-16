import AppContext from './context';
import schema from './schema';
import { graphqlHTTP } from 'express-graphql';
import { stackdriver } from '@myiworlds/services';
import 'dotenv/config';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const express = require('express')

// eslint-disable-next-line @typescript-eslint/no-var-requires
const cors = require('cors')

const server = express();

// enable `cors` to set HTTP response header: Access-Control-Allow-Origin:
server.use(
  cors({
    credentials: true,
    origin: true,
  }),
);

server.use(
  '/graphql',
  graphqlHTTP(async (req: any) => ({
  schema,
  context: await AppContext(req),
  graphiql: process.env.NODE_ENV !== 'production',
  customFormatErrorFn: (error: Error) => {
    stackdriver.report(new Error(`Graphql-api server errror: ${error}`));

    if (error.message.startsWith('Database Error: ')) {
      return new Error('Internal server error');
    }
    return error;
  },
})));

export default server;
