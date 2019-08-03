import { googleCloudServiceAccount } from '@myiworlds/credentials';
import { Storage } from '@google-cloud/storage';

const cloudStorage = new Storage({
  projectId: googleCloudServiceAccount.project_id,
  credentials: googleCloudServiceAccount,
});

export default cloudStorage;
