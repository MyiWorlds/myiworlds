import server from './server';
import { stackdriver } from '@myiworlds/services';
import { stackdriverWriterServiceAccount } from '@myiworlds/credentials';

require('@google-cloud/debug-agent').start({
  allowExpressions: true,
  projectId: stackdriverWriterServiceAccount.project_id,
  credentials: stackdriverWriterServiceAccount,
});

const port = Number(process.env.PORT) || 8000;
const host = process.env.HOSTNAME || 'localhost';

// Launch Node.js server
const app = server.listen(port, host, () => {
  console.log(`GraphQL-API server is ready at http://${host}:${port}/ 🚀`, process.env.NODE_ENV);
});

// Shutdown Node.js app gracefully
function handleExit(options: { cleanup: any; exit: any; }, err: any): any {
  if (options.cleanup) {
    const actions = [app.close];
    actions.forEach((close, i) => {
      try {
        close(() => {
          if (i === actions.length - 1) process.exit();
        });
      } catch (err) {
        if (i === actions.length - 1) process.exit();
      }
    });
  }
  if (err) {
    stackdriver.report(err);
  }
  if (options.exit) {
    process.exit()
  }
}

process.on('exit', handleExit.bind(null, { cleanup: true }));
process.on('SIGINT', handleExit.bind(null, { exit: true }));
process.on('SIGTERM', handleExit.bind(null, { exit: true }));
process.on('uncaughtException', handleExit.bind(null, { exit: true }));
