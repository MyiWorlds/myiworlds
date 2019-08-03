import Context from './Context';
import { ApolloServer } from 'apollo-server';
import { genSchema } from './utils/genSchema';
import { stackdriver } from '@myiworlds/cloud-services';
import 'dotenv/config';

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
    schema: genSchema() as any,
    playground,
    introspection: true,
    context: ({ req }: { req: any }) => Context(req),
    formatError: (error: any) => {
      // Can't get it to work with Apollo types
      stackdriver.report(new Error(`${error}`));

      if (error.message.startsWith('Database Error: ')) {
        return 'Internal server error';
      }

      return error.message;
    },
  });

  const app = await server
    .listen({ port: process.env.PORT || 8000 })
    .then(({ url }: { url: string }) => {
      console.log(`🚀  Server ready at ${url} 🚀`);
    });

  return app;
};
