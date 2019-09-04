import Error from '../../components/Error';
import guestUser from './guestUser';
import React, { useEffect, useState } from 'react';
import { firebase, firestore } from '../../lib/firebase';
import { LoggedInUser } from '@myiworlds/types';
import { ProviderStore } from './userContext.d';
import {
  useCreateUserMutation,
  useGetUserByIdQuery,
} from '../../generated/apolloComponents';

type SubscriptionToUser = null | (() => void);

export const UserContext = React.createContext({} as ProviderStore);

const UserProvider = ({ children }: any) => {
  const [user, setUser] = useState<LoggedInUser>(guestUser);
  const [userId, setUserId] = useState<string | null>(null);
  const [appLoading, setAppLoading] = useState<boolean>(true);
  const [isNewUser, setIsNewUser] = useState<boolean>(false);
  const [userEmail, setUserEmail] = useState<null | string>(null);
  // prettier-ignore
  // eslint-disable-next-line max-len
  const [userSubscription, setUserSubscription] = useState<SubscriptionToUser>(null);
  const [
    createUser,
    {
      data: createUserData,
      loading: createUserLoading,
      error: createUserError,
    },
  ] = useCreateUserMutation({
    variables: {
      id: userId!,
      email: userEmail!,
    },
  });

  const { data: getUserQuery, loading, error } = useGetUserByIdQuery({
    skip: !userId || user.id === userId,
  });

  const updateUserData = () => {
    if (getUserQuery && getUserQuery.getUserById) {
      setUser(getUserQuery.getUserById as LoggedInUser);
      setAppLoading(false);
    }
  };

  const handleLogin = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();

    provider.setCustomParameters({
      prompt: 'select_account',
    });

    try {
      firebase.auth().signInWithRedirect(provider);
    } catch (error) {
      console.log(error);
    }
  };

  const subscribeToUser = () => {
    if (user && user.id) {
      console.log('Subscribing to the user with email', user.email);
      const userSubscription = firestore
        .collection('users')
        .doc(user.id)
        .onSnapshot(
          (docSnapshot: firebase.firestore.DocumentSnapshot) => {
            const userDoc:
              | firebase.firestore.DocumentData
              | undefined = docSnapshot.data();

            if (userDoc && userDoc.exists) {
              const currentUserProperties: any = Object.getOwnPropertyNames(
                user,
              );
              const usersFieldsAreDifferent = currentUserProperties.every(
                (userProperty: keyof LoggedInUser) =>
                  user[userProperty] === userDoc[userProperty],
              );
              if (usersFieldsAreDifferent) {
                console.log('Users fields have changed and am updating them');
                setUserId(user.id);
              }
            } else {
              console.log('That user did not exist.');
            }
          },
          (error: Error) => {
            console.error(
              error,
              'There was an error subscribing to the logged in user',
            );
          },
        );

      console.log('Subscribed to the logged in user');
      if (userSubscription) {
        // Used to cancel the subscription to the user
        setUserSubscription(() => userSubscription);
      }
    }
  };

  const handleLogout = () => {
    console.log('Logging you out');
    if (userSubscription) {
      userSubscription();
    }
    document.cookie = 'token=;';
    setUserSubscription(null);
    setUserId(null);
    setUser(guestUser);
    firebase.auth().signOut();
  };

  const didMount = () => {
    firebase
      .auth()
      .getRedirectResult()
      .then((redirectUserCredential: firebase.auth.UserCredential) => {
        if (
          redirectUserCredential.user &&
          redirectUserCredential.additionalUserInfo
        ) {
          if (redirectUserCredential.additionalUserInfo.isNewUser) {
            console.log('New User going to start creation flow');
            setUserEmail(redirectUserCredential.user.email);
            setUserId(redirectUserCredential.user.uid);
            setIsNewUser(true);
          }
        }
      });

    firebase
      .auth()
      .onAuthStateChanged(async (firebaseUser: firebase.User | null) => {
        console.log('Auth State changed', firebaseUser);
        if (firebaseUser) {
          const token = await firebaseUser.getIdToken();
          document.cookie = `token=${token}`;
          console.log('Saved your token');
          setUserId(firebaseUser.uid);
          setAppLoading(false);
        } else {
          document.cookie = 'token=;';
          setAppLoading(false);
        }
      });
  };

  const createNewUser = () => {
    if (isNewUser && userId) {
      const createUserIfNew = async () => {
        await createUser();
        setIsNewUser(false);
      };
      createUserIfNew();
    }
  };

  const updateUserWithCreatedUser = () => {
    if (
      createUserData &&
      createUserData.createUser &&
      createUserData.createUser.createdUser
    ) {
      setUser(createUserData.createUser.createdUser as LoggedInUser);
      setAppLoading(false);
    }
  };

  useEffect(didMount, []);
  useEffect(subscribeToUser, [user]);
  useEffect(updateUserData, [getUserQuery]);
  useEffect(createNewUser, [createUser, isNewUser, userId]);
  useEffect(updateUserWithCreatedUser, [createUserData]);

  if (appLoading) {
    return <h1>Loading App</h1>;
  }

  if (createUserLoading) {
    console.log('Loading your user account');
    return <h1>loading</h1>;
  }

  if (createUserError) {
    return (
      <Error
        error={createUserError}
        message={'There was an error loading your user account'}
      />
    );
  }

  if (loading) {
    console.log('Loading your user account');
    return <h1>loading</h1>;
  }

  if (error) {
    return (
      <Error
        error={error}
        message={'There was an error loading your user account'}
      />
    );
  }

  return (
    <UserContext.Provider
      value={{
        user,
        handleLogout,
        handleLogin,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

const UserConsumer = UserContext.Consumer;

export { UserProvider, UserConsumer };
