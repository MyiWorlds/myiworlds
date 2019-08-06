import Context from './Context';
import { ApolloServer } from 'apollo-server';
import { genSchema } from './utils/genSchema';
import { googleCloudServiceAccount } from '@myiworlds/credentials';
import { GraphQLError } from 'graphql';
import { stackdriver } from '@myiworlds/cloud-services';
import 'dotenv/config';
import debugAgent = require('@google-cloud/debug-agent');

debugAgent.start({
  allowExpressions: true,
  projectId: googleCloudServiceAccount.project_id,
  credentials: googleCloudServiceAccount,
});

export const startServer = async () => {
  if (!process.env.NODE_ENV) {
    throw new Error(
      '❗️🛑❗️🛑❗️🛑❗️🛑❗️🛑❗️🛑 NO ENVIRONMENT SET IN YOUR package.json STARTUP SCRIPT THAT YOU RAN ❗️🛑❗️🛑❗️🛑❗️🛑❗️🛑❗️🛑',
    );
  }

  const playground: any = {
    settings: {
      'editor.theme': 'light',
      'editor.cursorShape': 'block',
    },
  };

  const server = new ApolloServer({
    cors: {
      credentials: true,
      origin: true,
    },
    schema: genSchema() as any,
    playground,
    introspection: true,
    context: ({ req }: { req: any }) => Context(req),
    tracing: process.env.NODE_ENV !== 'production' ? true : false,
    engine: {
      apiKey: process.env.ENGINE_API_KEY,
    },
    formatError: (error: GraphQLError) => {
      // Can't get it to work with Apollo types
      stackdriver.report(new Error(`${error}`));

      if (error.message.startsWith('Database Error: ')) {
        return new Error('Internal server error');
      }

      return new Error(error.message);
    },
  });

  const app = await server
    .listen({ port: process.env.PORT || 8000 })
    .then(({ url }: { url: string }) => {
      console.log(`🚀  Server ready at ${url} 🚀`);
    });

  return app;
};
