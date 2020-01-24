# MyiWorlds

## A fork of a modern web app for your starter kit:

### Both Frontend/Backend
- [Typescript](https://www.typescriptlang.org/)
- [Nrwl NX Monorepo](https://nx.dev/react) (Allows code share)
- [Firebase Auth](https://firebase.google.com/products/auth/)
- [Apollo Codegen](https://graphql-code-generator.com/)

### Frontend
- [ReactJS (Hooks)](https://reactjs.org/)
- [NextJS](https://nextjs.org/)
- [Apollo Client](https://www.apollographql.com/docs/react/)
- [Material UI](https://material-ui.com/)
- [Live data subscriptions (Firestore)](https://firebase.google.com/docs/firestore/query-data/listen)
- [Deployed to Google Cloud Run](https://cloud.google.com/run/)
- Deployed on [Firebase Hosting](https://firebase.google.com/products/hosting) and [Firebase Functions](https://firebase.google.com/products/functions/)
- Auth checking on queries
- Full app wide authentication using React Context (NOT basic, very detailed)

### Backend
- [Firebase Firestore](https://firebase.google.com/products/firestore/)
- [Firebase Functions](https://firebase.google.com/products/functions/)
- [Apollo Server](https://www.apollographql.com/docs/apollo-server/)
- [Dataloader](https://github.com/graphql/dataloader)
- [Docker](https://www.docker.com/)
- [Stackdriver Error handling](https://cloud.google.com/stackdriver/)
- [Cloud Build*](https://cloud.google.com/cloud-build/)
- [Service accounts for each service](https://cloud.google.com/compute/docs/access/service-accounts)
- [Google Cloud Storage *](https://cloud.google.com/storage/)
- [Dynamic image resizer AppEngine (Python) *](https://medium.com/google-cloud/uploading-resizing-and-serving-images-with-google-cloud-platform-ca9631a2c556)

<i>\* Still to implement</i>

## Setup Instructions
*All parts are required for the project to work correctly*

### 1. Firebase
- Create a Firebase project.
- Get your Firebase Config for it (used for Firebase Authentication).
  - In the Firebase Console click the Settings cog, then "Project Settings".
  - In the first tab "General", scroll down and copy the firebaseConfig object.
  - Inside this project (MyiWorlds), navigate to the "libs/credentials/firebase" folder and create a file named firebaseConfig.ts.
  - Paste your Firebase config inside there and do a "export const firebaseConfig = {...your Firebase config here}

### 2. Google Cloud Platform

# Setting up Google Cloud Run:
- [Setup guide](https://cloud.google.com/cloud-build/docs/deploying-builds/deploy-cloud-run)

## Services to enable:
- [Container Registry](https://console.cloud.google.com/apis/library/containerregistry.googleapis.com)
- [Resource Manager API](https://console.cloud.google.com/apis/library/cloudresourcemanager.googleapis.com?project=myiworlds&folder&organizationId=181350008905)

## Starting your development environment
![2019-11-16_12-09-53](https://user-images.githubusercontent.com/15203899/68998648-234c9b00-086a-11ea-950e-d68f2378e1df.gif)


### 3. In project folder

Install the firebase tools.  We will use this for deploying our Firestore Rules
```
npm i -g firebase-tools
```

Login into the email you created the Firebase project in by typing 
```
firebase login
```
Then follow these steps on the setup in the terminal

```
  * You are currently outside your home directory

? Are you ready to proceed? Yes



? Please select an option: Use an existing project



? What file should be used for Firestore Rules? firestore.rules



? What file should be used for Firestore indexes? firestore.indexes.json
```

Start the frontend and your graphql-api by running:

```
npm run watch
```

In VSCode go to the debug menu item on the left side, in the dropdown select "Frontend & Backend Debug" then press the green play button.

## Deploying

### Frontend
```
nx deploy frontend
```
This builds your nextjs application, places the code in the "dist/functions" folder where Firebase Functions will use it to do server side rendering.  In this process it will also setup Firebase hosting to redirect to your server side rendered Nextjs.

### Backend
#### Automatic on GitHub trigger:
To have it watch your GitHub repository and then automatically build ONLY the affected applications follow the setup guide [HERE](https://cloud.google.com/cloud-build/docs/running-builds/create-manage-triggers)

#### Manual:
```
nx deploy graphql-api
```
This sends your app to Google Cloud Container Registry, Cloud Build then see's it and starts building a dev environment so you have the necessary pieces of NX to do the production build.  After Cloud Build passes everything it will then deploy the graphql-api to Cloud Run in "us-central1".




Want to create a shared folder in the libs directory to use in multiple of your /apps project?
```
nx g @nrwl/workspace:library lib-name-here
```

Importing in NX
```
import { SomeToken } from '@myiworlds/lib-name-here'; // the `@myiworlds` scope is configured in `nx.json` "npmScope" field (may be required to change in other places).
```


This project was created using NX:

Visit the [Nx Documentation](https://nx.dev) to learn more.


Setting up Nextjs hosting on Firebase Hosting/Functions was done through [functions](https://medium.com/mean-fire/nx-nrwl-firebase-functions-98f96f514055) and [combining both](https://github.com/zeit/next.js/tree/canary/examples/with-firebase-hosting)
