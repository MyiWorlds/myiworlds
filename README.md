# This is not quite ready for you yet!

I am still working on the core architecture, but will turn it on for people to watch the progression soon-ish... I have been working on this since 2013 and is the reason I am a software developer. The majority of my life since then has been spent planning/creating/rebuilding this. When it is to a stable status I will be opening it up to anyone to see and join.

I want to allow everyone to be better. I am building an interface to do as many things as I can through (imagine an operating system that you will use on your all your devices, computer, vr, ar, and eventually neural link). The user experience is specifically picked by the person using it. Being someone who uses so many different websites/applications I find it incredibly annoying to have features not available on some apps or just have no idea how to create or find the things your looking for. I want to be able create pages combining any type of content that someone has made in a single system. I believe having a market place of open source features anyone can use and customize for themselves in a central system will push us closer to a type 1 civilization. We are a fragile species living on a rock flying through space... We need to unite and advance our species.

Some core principles:

- View all content in the way you want. When you see text, images, videos, etc they are displayed with your chosen user interface elements and it is secondary things are displayed how the person who created them set it as.
- There are 3 main types of data stored. Users (the people interacting with the app), profiles (I like to keep my life separated by work, family, close friends, friends, business, etc), and circles. Anything can be created inside of a graph of circles connecting to other circles with lines. Then their are secondary ones that are just user clones, profile clones, circle clones. What happens is any time anything makes an edit to one of those types the system will first clone it and save the current state into a clone. In the process take away most of the ways to search for them (less indexes). This saves money for the database not having to memorize so many things.
- Separte your lives, but having the ability to quickly view everything at a glance.
- Construct pages using anything and simple page editing with drag drop and editors. It will be starting with basic content types like text, booleans, numbers, objects, images, videos, connecting to other content and then more advanced content types.
- History kept on by default for everything that is done. My hope is to at some point have AI models analysing all of your interactions and help us all to become the ultimate concious beings.

# The Stack

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
- [Cloud Build\*](https://cloud.google.com/cloud-build/)
- [Service accounts for each service](https://cloud.google.com/compute/docs/access/service-accounts)
- [Google Cloud Storage \*](https://cloud.google.com/storage/)
- [Dynamic image resizer AppEngine (Python) \*](https://medium.com/google-cloud/uploading-resizing-and-serving-images-with-google-cloud-platform-ca9631a2c556)

<i>\* Still to implement</i>

## Setup Instructions

_All parts are required for the project to work correctly_

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
- [Resource Manager API](https://console.cloud.google.com/apis/library/cloudresourcemanager.googleapis.com)

## Starting your development environment

![2019-11-16_12-09-53](https://user-images.githubusercontent.com/15203899/68998648-234c9b00-086a-11ea-950e-d68f2378e1df.gif)

### 3. In project folder

Install the firebase tools. We will use this for deploying our Firestore Rules

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

This builds your nextjs application, places the code in the "dist/functions" folder where Firebase Functions will use it to do server side rendering. In this process it will also setup Firebase hosting to redirect to your server side rendered Nextjs.

### Backend

#### Automatic on GitHub trigger:

To have it watch your GitHub repository and then automatically build ONLY the affected applications follow the setup guide [HERE](https://cloud.google.com/cloud-build/docs/running-builds/create-manage-triggers)

#### Manual:

```
nx deploy graphql-api
```

This sends your app to Google Cloud Container Registry, Cloud Build then see's it and starts building a dev environment so you have the necessary pieces of NX to do the production build. After Cloud Build passes everything it will then deploy the graphql-api to Cloud Run in "us-central1".

## Creating secrets and storing them (service accounts, keys, etc)

[Setup guide](https://cloud.google.com/secret-manager/docs/creating-and-accessing-secrets)

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
