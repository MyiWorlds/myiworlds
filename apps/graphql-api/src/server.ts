import * as cors from 'cors';
import * as express from 'express';
import * as graphqlHTTP from 'express-graphql';
import Context from './context';
import schema from './schema';
import { stackdriver } from '@myiworlds/services';
import 'dotenv/config';

const app = express();

app.use(cors({
  credentials: true,
  origin: true,
})); // enable `cors` to set HTTP response header: Access-Control-Allow-Origin: *

app.use(
  '/graphql',
  graphqlHTTP(async (req: any) => ({
    schema,
    context: await Context(req),
    graphiql: process.env.NODE_ENV !== 'production',
    customFormatErrorFn: (error: Error) => {
      stackdriver.report(new Error(`Graphql-api server errror: ${error}`));

      if (error.message.startsWith('Database Error: ')) {
        return new Error('Internal server error');
      }
      return error;
    }
  })),
);


export default app;
