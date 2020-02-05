import { SecretManagerServiceClient } from '@google-cloud/secret-manager';
// import { ServiceKeyConfig } from '@myiworlds/types';
// import stackdriver from './stackdriver';
import {
  securityManagerReaderServiceAccount,
  googleCloud,
} from '@myiworlds/credentials';

const client = new SecretManagerServiceClient({
  projectId: securityManagerReaderServiceAccount.project_id,
  credentials: securityManagerReaderServiceAccount,
});

// interface ServiceKey {
//   type: string;
//   project_id: string;
//   private_key_id: string;
//   private_key: string;
//   client_email: string;
//   client_id: string;
//   auth_uri: string;
//   token_uri: string;
//   auth_provider_x509_cert_url: string;
//   client_x509_cert_url: string;
// }

/*
  This should never be returned to the client side as it could be
  a big security leak
*/
// const accessSecretServiceKey = async (
//   name: string,
//   version: string | number,
// ): Promise<ServiceKey | null> => {
//   const secretName = `projects/${googleCloud.project}/secrets/${name}/versions/${version}`;

//   try {
//     const [versionPayload] = await client.accessSecretVersion({
//       name: secretName,
//     });

//     if (!versionPayload.payload || !versionPayload.payload.data) {
//       return null;
//     }

//     const payload: ServiceKey = JSON.parse(
//       versionPayload.payload.data.toString(),
//     );

//     return payload;
//   } catch (error) {
//     stackdriver.report(error);
//     return null;
//   }
// };

async function createSecret(secretName: string) {
  const parent = `/projects/${googleCloud.project}`;
  const [secret] = await client.createSecret({
    parent: parent,
    secretId: secretName,
    secret: {
      replication: {
        automatic: {},
      },
    },
  });
  console.log(`Created secret ${secret.name}`);
  if (secret.name) {
    return true;
  } else {
    return false;
  }
}

const createServiceKeys = async () => {
  // Only call this function if is system admin
  const createServiceKeysResponse = {
    totalCreated: 0,
    wasSuccessful: true,
  };
  const createdSecret = await createSecret('testing');
  console.log(createdSecret);
  return createServiceKeysResponse;
  // googleCloud.serviceKeysToCreate.forEach(
  //   async (serviceKeyConfig: ServiceKeyConfig) => {
  //     if (!createServiceKeysResponse.wasSuccessful) {
  //       return;
  //     }

  //     const secretName = `${googleCloud.creatorGmail}-${serviceKeyConfig.name}`;
  //     const createdSecret = await createSecret(secretName);

  //     if (createdSecret) {
  //       createServiceKeysResponse.totalCreated++;
  //       return;
  //     } else {
  //       createServiceKeysResponse.wasSuccessful = false;
  //       return;
  //     }
  //   },
  // );

  return createServiceKeysResponse;
};

export default createServiceKeys;
