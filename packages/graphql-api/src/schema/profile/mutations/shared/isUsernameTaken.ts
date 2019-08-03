import { firestore } from '@myiworlds/cloud-services';

export default async function isUsernameTaken(username: string) {
  return firestore
    .collection('profiles')
    .where('username', '==', username)
    .limit(1)
    .get()
    .then((response: any) => {
      return response.docs.length ? true : false;
    });
}
