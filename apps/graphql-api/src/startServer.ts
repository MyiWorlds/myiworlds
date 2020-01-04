import Context from './context';
import { ApolloServer, PlaygroundConfig } from 'apollo-server';
import { ExpressContext } from 'apollo-server-express/dist/ApolloServer';
import { genSchema } from './utils/genSchema';
import { GraphQLError } from 'graphql';
import { stackdriver } from '@myiworlds/services';
import { stackdriverWriterServiceAccount } from '@myiworlds/credentials';
import 'dotenv/config';

require('@google-cloud/debug-agent').start({
  allowExpressions: true,
  projectId: stackdriverWriterServiceAccount.project_id,
  credentials: stackdriverWriterServiceAccount,
});

export const startServer = async () => {
  if (!process.env.NODE_ENV) {
    throw new Error(
      '❗️🛑❗️🛑❗️🛑❗️🛑❗️🛑❗️🛑 NO ENVIRONMENT SET IN YOUR package.json STARTUP SCRIPT THAT YOU RAN ❗️🛑❗️🛑❗️🛑❗️🛑❗️🛑❗️🛑',
    );
  }

  const playground: PlaygroundConfig = {
    settings: {
      'editor.theme': 'dark',
      'editor.cursorShape': 'block',
    },
  };

  const server = new ApolloServer({
    cors: {
      credentials: true,
      origin: true,
    },
    schema: genSchema(),
    playground: process.env.NODE_ENV !== 'production' ? playground : false,
    introspection: process.env.NODE_ENV !== 'production',
    context: ({ req }: { req: ExpressContext['req'] }) => Context(req),
    tracing: process.env.NODE_ENV !== 'production' ? true : false,
    engine: {
      apiKey: process.env.ENGINE_API_KEY,
    },
    formatError: (error: GraphQLError) => {
      // Can't get it to work with Apollo types
      stackdriver.report(new Error(`Apollo Server formatError ${error}`));

      if (error.message.startsWith('Database Error: ')) {
        return new Error('Internal server error');
      }

      return new Error(error.message);
    },
  });

  const app = await server
    .listen({ port: process.env.PORT || 8000 })
    .then(({ url }: { url: string }) => {
      console.log(`🚀  Server ready at ${url} 🚀`, process.env.NODE_ENV);
    });

  return app;
};
