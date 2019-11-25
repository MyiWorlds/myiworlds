import { ErrorReporting } from '@google-cloud/error-reporting';
import { stackdriverWriterServiceAccount } from '@myiworlds/credentials';

const stackdriver = new ErrorReporting({
  projectId: stackdriverWriterServiceAccount.project_id,
  credentials: stackdriverWriterServiceAccount,
  reportMode: 'always',
});

export default stackdriver;
