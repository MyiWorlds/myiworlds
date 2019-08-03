import { ErrorReporting } from '@google-cloud/error-reporting';
import { googleCloudServiceAccount } from '@myiworlds/credentials';

const stackdriver = new ErrorReporting({
  projectId: googleCloudServiceAccount.project_id,
  credentials: googleCloudServiceAccount,
  reportMode: 'always',
});

export default stackdriver;
