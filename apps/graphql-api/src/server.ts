import AppContext from './context';
import cors from 'cors';
import express from 'express';
import schema from './schema';
import { graphqlHTTP } from 'express-graphql';
import { stackdriver } from '@myiworlds/services';
import 'dotenv/config';

const app = express();

// enable `cors` to set HTTP response header: Access-Control-Allow-Origin:
app.use(
  cors({
    credentials: true,
    origin: true,
  }),
);

const gql = () =>
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
  }));

app.use('/graphql', gql);

export default app;
