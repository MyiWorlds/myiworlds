import * as functions from 'firebase-functions';
import next from 'next';

const app = next({
  dev: false,
  conf: { distDir: 'dist/apps/functions/frontend' },
});

const nextApp = functions.https.onRequest(
  async (req: functions.https.Request, res: functions.Response) => {
    return app
      .prepare()
      .then(() => app.getRequestHandler()(req, res))
      .catch(err => console.error(err.message));
  },
);

export { nextApp };
