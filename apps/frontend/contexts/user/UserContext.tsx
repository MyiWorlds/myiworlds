import ProgressWithMessage from '../../components/ProgressWithMessage';
import React, { useEffect, useState } from 'react';
import { firebase } from '../../lib/firebase';
import { LoggedInUser } from '@myiworlds/types';
import { ProviderStore, UserToCreate } from './userContextTypes.d';

export const UserContext = React.createContext({} as ProviderStore);

const guestUser = {
  id: null,
  email: 'guest@email.com',
};

const UserProvider = ({ children }: any) => {
  const [user, setUser] = useState<LoggedInUser>(guestUser);
  const [userToCreate, setUserToCreate] = useState<null | UserToCreate>(null);
  const [appLoading, setAppLoading] = useState(true);

  console.log('userToCreate', userToCreate);

  const handleLogin = () => {
    const provider = new firebase.auth.GoogleAuthProvider();

    provider.setCustomParameters({
      prompt: 'select_account',
    });

    try {
      firebase.auth().signInWithRedirect(provider);
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogout = () => {
    console.log('Logging you out');
    document.cookie = 'token=;';
    firebase.auth().signOut();
    setUser(guestUser);
  };

  const didMount = () => {
    document.cookie = 'token=;';

    firebase
      .auth()
      .getRedirectResult()
      .then((redirectUserCredential: firebase.auth.UserCredential) => {
        if (
          redirectUserCredential.user &&
          redirectUserCredential.additionalUserInfo
        ) {
          if (redirectUserCredential.additionalUserInfo.isNewUser) {
            if (redirectUserCredential.user.email) {
              setUser({
                id: redirectUserCredential.user.uid,
                email: redirectUserCredential.user.email,
              });
              // Used for when we want to add it to the database
              setUserToCreate({
                id: redirectUserCredential.user.uid,
                email: redirectUserCredential.user.email,
              });
            } else {
              // Give error back to user to try again or another email
            }
          }
        }
      });

    firebase
      .auth()
      .onAuthStateChanged(async (firebaseUser: firebase.User | null) => {
        if (firebaseUser) {
          if (!firebaseUser.email) {
            // return alert
            return;
          }
          const token = await firebaseUser.getIdToken();
          document.cookie = `token=${token}`;
          console.log('Added a new token cookie');
          setUser({
            id: firebaseUser.uid,
            email: firebaseUser.email,
          });
          setAppLoading(false);
        } else {
          document.cookie = 'token=;';
          setAppLoading(false);
        }
      });
  };

  useEffect(didMount, []);

  if (appLoading) {
    return <ProgressWithMessage message="Loading Application" />;
  }

  return (
    <UserContext.Provider
      value={{
        user,
        handleLogin,
        handleLogout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

const UserConsumer = UserContext.Consumer;

export { UserProvider, UserConsumer };
