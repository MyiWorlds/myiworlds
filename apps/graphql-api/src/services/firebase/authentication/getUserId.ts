import { firebaseAdmin, stackdriver } from '@myiworlds/services';

const getUserId = async (token: string) => {
  if (token && token !== 'null') {
    try {
      const decodedToken = await firebaseAdmin.auth().verifyIdToken(token);
      return decodedToken.uid;
    } catch (error) {
      stackdriver.report(error);
      return null;
    }
  } else {
    return null;
  }
};

export default getUserId;
