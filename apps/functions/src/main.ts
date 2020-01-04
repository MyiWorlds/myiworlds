import { nextApp as next } from './app/nextApp';

/*
Namespace application services with function groups.
Partially deploy namespaces for independent service updates.
*/

// SSR Next.js app Cloud Function used by Firebase Hosting
// yarn deploy-app
const app = {
  next,
  // other Hosting dependencies
};

// Other functions service
// yarn deploy-functions
const otherFirebaseFunctions = {
  // other funcs
};

export { app, otherFirebaseFunctions };
