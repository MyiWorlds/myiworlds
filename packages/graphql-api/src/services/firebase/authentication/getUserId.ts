import { firebase, stackdriver } from '@myiworlds/cloud-services';

const getUserId = async (token: string) => {
  if (token && token !== 'null') {
    const userId = await firebase
      .auth()
      .verifyIdToken(token)
      .then((decodedToken: any) => {
        const id = decodedToken.uid;
        return id;
      })
      .catch((error: any) => {
        stackdriver.report(error);

        return null;
      });
    return userId;
  } else {
    return null;
  }
};

export default getUserId;
