import { googleCloudServiceAccount } from '@myiworlds/credentials';
import { startServer } from './startServer';
import debugAgent = require('@google-cloud/debug-agent');

debugAgent.start({
  allowExpressions: true,
  projectId: googleCloudServiceAccount.project_id,
  credentials: googleCloudServiceAccount,
});

startServer();
