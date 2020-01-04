# MyiWorlds

## A fork of a modern web app for your starter kit:

### Both Frontend/Backend
- Typescript
- Nrwl NX Monorepo
- Firebase Auth
- Apollo Codegen
- Code sharing

### Frontend
- ReactJS (Hooks)
- NextJS
- MaterialUI
- Live data subscriptions (Firestore)
- Full app wide auth context (NOT basic, very detailed)
- Deployed to Google Cloud Run
- Auth checking on queries
- Deployed on Firebase hosting + Cloud Function

### Backend
- Apollo Server
- Dataloader
- Docker
- Stackdriver Error handling
- Cloud Build
- Service accounts for each service
- Google Cloud Storage
- Dynamic image resizer AppEngine (Python)


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

```npm run watch```

In VSCode go to the debug menu item on the left side, in the dropdown select "Frontend & Backend Debug" then press the green play button.

## Deploying

### Frontend
```
frontend:deploy
```
This builds your nextjs application, places the code in the "dist/functions" folder where Firebase Functions will use it to do server side rendering.  In this process it will also setup Firebase hosting to redirect to your server side rendered Nextjs.

### Backend
```
graphql-api:deploy
```
This builds the graphql server and deploys it to Google Cloud Run.


<!-- Not setup yet -->
<!-- ## Enable Cloud Build
Go to `https://console.cloud.google.com/cloud-build` and enable the API

Set it up to your GitHub account or wherever you host it -->


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
