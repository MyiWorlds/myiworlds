import Error from '../../components/Error';
import firebase from '../../lib/firebase/firebase';
import firebaseAuth from '../../lib/firebase/firebaseAuth';
import firestoreClient from './../../lib/firebase/firestoreClient';
import guestUser from './guestUser';
import ProgressWithMessage from '../../components/ProgressWithMessage';
import React, { useContext, useEffect, useState } from 'react';
import { FIRESTORE_COLLECTIONS, RESPONSE_CODES } from '@myiworlds/enums';
import { LoggedInUser, User } from '@myiworlds/types';
import { ProviderStore, UserToCreate } from './userContextTypes';
import { setCookie } from './../../functions/cookies';
import { systemMessagesAtom } from '../../atoms/userInterfaceAtoms';
import { useGetUserByIdQuery } from './../../generated/apolloComponents';
import { useSetRecoilState } from 'recoil';
import {
  useCreateUserMutation,
  useDeleteUserMutation,
} from '../../generated/apolloComponents';

export const UserContext = React.createContext({} as ProviderStore);

type SubscriptionToUser = null | (() => void);

const UserProvider = ({ children }: any) => {
  const [user, setUser] = useState<LoggedInUser>(guestUser);
  const [userToCreate, setUserToCreate] = useState<null | UserToCreate>(null);
  const [userIdToLogin, setUserIdToLogin] = useState<string | null>(null);
  const [appLoading, setAppLoading] = useState(true);
  const setSystemMessages = useSetRecoilState(systemMessagesAtom);

  const [userSubscription, setUserSubscription] = useState<SubscriptionToUser>(
    null,
  );
  const [
    createUser,
    {
      data: createUserData,
      loading: createUserLoading,
      error: createUserError,
    },
  ] = useCreateUserMutation({
    variables: {
      id: userToCreate ? userToCreate.id : '',
      email: userToCreate ? userToCreate.email : '',
      photoURL: userToCreate ? userToCreate.photoURL : '',
    },
  });

  const [
    deleteUser,
    {
      data: deleteUserData,
      loading: deleteUserLoading,
      error: deleteUserError,
    },
  ] = useDeleteUserMutation();

  const {
    data: getUserQuery,
    loading: getUserLoading,
    error: getUserError,
  } = useGetUserByIdQuery({
    skip: !userIdToLogin,
    fetchPolicy: 'no-cache',
  });

  const updateCurrentUser = ({
    id,
    email,
    photoURL,
    dateCreated,
    dateUpdated,
    isSystemAdmin,
    canCreate,
  }: LoggedInUser) => {
    if (id) {
      setUser({
        id,
        email,
        collection: FIRESTORE_COLLECTIONS.USERS,
        photoURL,
        dateCreated,
        dateUpdated,
        isSystemAdmin,
        canCreate,
      });
    }
  };

  const handleLogin = () => {
    const provider = new firebase.auth.GoogleAuthProvider();

    provider.setCustomParameters({
      prompt: 'select_account',
    });

    try {
      console.log('Starting Login process.');
      firebaseAuth.signInWithRedirect(provider);
    } catch (error) {
      console.error(error);
    }
  };

  const resetBrowserCookies = () => {
    document.cookie = 'token=;path=/';
    document.cookie = 'userId=;path=/';
    document.cookie = 'isSystemAdmin=;path=/';
  };

  const handleLogout = () => {
    console.log('Logging you out');
    if (userSubscription) {
      userSubscription();
    }
    resetBrowserCookies();
    setUserSubscription(null);
    firebaseAuth.signOut();
    setUserIdToLogin(null);
    setUser(guestUser);
  };

  const firebaseAuthListener = (calledFromTimeout = false) => {
    firebaseAuth.onAuthStateChanged(
      async (firebaseUser: firebase.User | null) => {
        if (firebaseUser) {
          if (!firebaseUser.email) {
            setSystemMessages({
              title:
                'There was no email associated with the email that was attempting to login.',
              autoHideDuration: 10000,
            });
            return;
          }
          const token = await firebaseUser.getIdToken();
          setCookie('token', token);
          setCookie('userId', firebaseUser.uid);
          console.log(
            'Added a new token cookie and setting your user id to login.',
          );

          if (!calledFromTimeout) {
            setUserIdToLogin(firebaseUser.uid);
            setAppLoading(false);
            firebaseAuthRefreshTimeout();
          }
        } else {
          console.log('Reseting your token.');
          document.cookie = 'token=;path=/';
          document.cookie = 'userId=;path=/';
          document.cookie = 'selectedProfileId=;path=/';

          setAppLoading(false);
        }
      },
    );
  };

  const firebaseAuthRefreshTimeout = () => {
    const timeout = setTimeout(() => {
      console.log('Refreshing your authentication token.');
      firebaseAuthListener(true);
      firebaseAuthRefreshTimeout();
    }, 3300000);
    return () => clearTimeout(timeout);
  };

  const didMount = () => {
    document.cookie = 'token=;path=/';
    document.cookie = 'userId=;path=/';
    document.cookie = 'isSystemAdmin=;path=/';
    firebaseAuth
      .getRedirectResult()
      .then((redirectUserCredential: firebase.auth.UserCredential) => {
        if (
          redirectUserCredential.user &&
          redirectUserCredential.additionalUserInfo
        ) {
          if (redirectUserCredential.additionalUserInfo.isNewUser) {
            if (redirectUserCredential.user.email) {
              console.log(
                'User created a valid account, setting it for account creation.',
              );
              setUserToCreate({
                id: redirectUserCredential.user.uid,
                email: redirectUserCredential.user.email,
                photoURL: redirectUserCredential.user.photoURL,
              });
            } else {
              document.cookie = 'selectedProfileId=;path=/';
              document.cookie = 'isSystemAdmin=;path=/';
              setSystemMessages({
                title:
                  'That email did not exist, try again or use a different email.',
                autoHideDuration: 10000,
              });
            }
          }
        }
      });

    firebaseAuthListener();

    return () => {
      if (userSubscription) {
        userSubscription();
      }
    };
  };

  const subscribeToUser = () => {
    if (user && user.id && !userSubscription) {
      console.log('Subscribing to the user with email: ', user.email);
      const subscriptionToUser = firestoreClient
        .collection(FIRESTORE_COLLECTIONS.USERS)
        .doc(user.id)
        .onSnapshot(
          (docSnapshot: firebase.firestore.DocumentSnapshot) => {
            const userDoc:
              | firebase.firestore.DocumentData
              | User
              | undefined = docSnapshot.data();

            if (userDoc && docSnapshot.exists) {
              console.log(
                'Users fields have changed and I am going to update them.',
              );

              updateCurrentUser(userDoc as LoggedInUser);
              setCookie('isSystemAdmin', userDoc.isSystemAdmin);
              return;
            } else {
              console.log(
                'That user no longer exist.  You have been logged in as a guest.',
              );
              setUser(guestUser);
              setUserIdToLogin(null);
              return;
            }
          },
          (error: Error) => {
            console.error(
              'There was an error subscribing to the logged in user',
              error,
            );
            return;
          },
        );

      if (subscriptionToUser) {
        // Used to cancel the subscription to the user
        console.log(
          'Subscribed to the logged in user.  Any changes made to the user will instantly update this app.',
        );
        setUserSubscription(() => subscriptionToUser);
      }
    }
  };

  const updateUserData = () => {
    if (getUserQuery && getUserQuery.getUserById) {
      console.log('The user was fetched and is being updated.');
      updateCurrentUser(getUserQuery.getUserById as LoggedInUser);
      subscribeToUser();
      setUserIdToLogin(null);
      setAppLoading(false);
    }
  };

  const createNewUser = () => {
    if (userToCreate) {
      createUser();
    }
  };

  const updateUserWithCreatedUser = () => {
    if (
      createUserData &&
      createUserData.createUser &&
      createUserData.createUser.createdUser &&
      createUserData.createUser.createdUser.id
    ) {
      console.log('User was created and updating the application with it.');
      updateCurrentUser(createUserData.createUser.createdUser as LoggedInUser);
      subscribeToUser();
      setAppLoading(false);
      setUserToCreate(null);
    }
  };

  const userAccountDeleted = () => {
    if (deleteUserData && deleteUserData.deleteUser) {
      console.log('Cleaning up the Users old data');
      if (deleteUserData.deleteUser.status === RESPONSE_CODES.ERROR) {
        setSystemMessages({
          title: deleteUserData.deleteUser.message,
          autoHideDuration: 10000,
        });
      } else if (deleteUserData.deleteUser.userDeleted) {
        handleLogout();
        setSystemMessages({
          title: 'Your User account was deleted.',
          autoHideDuration: 10000,
        });
      }
    }
  };

  useEffect(didMount, []);
  useEffect(subscribeToUser, [user]);
  useEffect(updateUserData, [getUserQuery]);
  useEffect(createNewUser, [createUser, userToCreate]);
  useEffect(updateUserWithCreatedUser, [createUserData]);
  useEffect(userAccountDeleted, [deleteUserData]);

  if (createUserLoading) {
    return <ProgressWithMessage message="Creating User account" />;
  }

  if (getUserLoading) {
    return <ProgressWithMessage message="Logging in" />;
  }

  if (appLoading) {
    return <ProgressWithMessage message="Loading Application" />;
  }

  if (deleteUserLoading) {
    return <ProgressWithMessage message="Deleting your User account" />;
  }

  if (deleteUserError) {
    return (
      <Error
        error={deleteUserError}
        message="There was an error deleting your User account.  Please refresh and try again."
      />
    );
  }

  if (createUserError) {
    return (
      <Error
        error={createUserError}
        message="There was an error creating your User account.  Please refresh and try again."
      />
    );
  }

  if (getUserError) {
    return (
      <Error
        error={getUserError}
        message="There was an error getting the User account you requested. Please refresh and try again."
      />
    );
  }

  return (
    <UserContext.Provider
      value={{
        user,
        handleLogin,
        handleLogout,
        handleDeleteAccount: deleteUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

const UserConsumer = UserContext.Consumer;

export { UserProvider, UserConsumer };
