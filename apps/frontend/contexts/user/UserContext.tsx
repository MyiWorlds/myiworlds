import Error from '../../components/Error';
import firebase from '../../lib/firebase/firebase';
import firebaseAuth from '../../lib/firebase/firebaseAuth';
import firestoreClient from './../../lib/firebase/firestoreClient';
import ProgressWithMessage from '../../components/ProgressWithMessage';
import React, { useContext, useEffect, useState } from 'react';
import { LoggedInUser } from '@myiworlds/types';
import { ProviderStore, UserToCreate } from './userContextTypes';
import { RESPONSE_CODES } from '@myiworlds/enums';
import { SystemMessagesContext } from '../SystemMessages/SystemMessagesContext';
import { useGetUserByIdQuery } from './../../generated/apolloComponents';
import {
  useCreateUserMutation,
  useDeleteUserMutation,
} from '../../generated/apolloComponents';

export const UserContext = React.createContext({} as ProviderStore);

type SubscriptionToUser = null | (() => void);

const guestUser = {
  id: null,
  email: 'guest@email.com',
  photoURL: null,
  isSystemAdmin: false,
  dateCreated: Date.now(),
  dateUpdated: Date.now(),
};

const UserProvider = ({ children }: any) => {
  const [user, setUser] = useState<LoggedInUser>(guestUser);
  const [userToCreate, setUserToCreate] = useState<null | UserToCreate>(null);
  const [userIdToLogin, setUserIdToLogin] = useState<string | null>(null);
  const [appLoading, setAppLoading] = useState(true);
  const { setAppSnackbar } = useContext(SystemMessagesContext);
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

  const saveUser = ({
    id,
    email,
    photoURL,
    dateCreated,
    dateUpdated,
    isSystemAdmin,
  }: LoggedInUser) => {
    setUser({
      id,
      email,
      photoURL,
      dateCreated,
      dateUpdated,
      isSystemAdmin,
    });
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

  const handleLogout = () => {
    console.log('Logging you out');
    if (userSubscription) {
      userSubscription();
    }
    document.cookie = 'token=;path=/';
    setUserSubscription(null);
    firebaseAuth.signOut();
    setUserIdToLogin(null);
    setUser(guestUser);
  };

  const didMount = () => {
    document.cookie = 'token=;path=/';

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
              setAppSnackbar({
                title:
                  'That email did not exist, try again or use a different email.',
                autoHideDuration: 10000,
              });
            }
          }
        }
      });

    firebaseAuth.onAuthStateChanged(
      async (firebaseUser: firebase.User | null) => {
        if (firebaseUser) {
          if (!firebaseUser.email) {
            setAppSnackbar({
              title:
                'There was no email associated with the email that was attempting to login.',
              autoHideDuration: 10000,
            });
            return;
          }
          const token = await firebaseUser.getIdToken();
          document.cookie = `token=${token};path=/`;
          console.log(
            'Added a new token cookie and setting your user id to login.',
          );
          setUserIdToLogin(firebaseUser.uid);
          setAppLoading(false);
        } else {
          console.log('Reseting your token.');
          document.cookie = 'token=;path=/';
          setAppLoading(false);
        }
      },
    );

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
        .collection('users')
        .doc(user.id)
        .onSnapshot(
          (docSnapshot: firebase.firestore.DocumentSnapshot) => {
            const userDoc:
              | firebase.firestore.DocumentData
              | undefined = docSnapshot.data();

            if (userDoc && docSnapshot.exists) {
              console.log(
                'Users fields have changed and I am going to update them.',
              );
              saveUser(userDoc as LoggedInUser);
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
      saveUser(getUserQuery.getUserById as LoggedInUser);
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
      saveUser(createUserData.createUser.createdUser as LoggedInUser);
      subscribeToUser();
      setAppLoading(false);
      setUserToCreate(null);
    }
  };

  const userAccountDeleted = () => {
    if (deleteUserData && deleteUserData.deleteUser) {
      console.log('Cleaning up the Users old data');
      if (deleteUserData.deleteUser.status === RESPONSE_CODES.ERROR) {
        setAppSnackbar({
          title: deleteUserData.deleteUser.message,
          autoHideDuration: 10000,
        });
      } else if (deleteUserData.deleteUser.userDeleted) {
        handleLogout();
        setAppSnackbar({
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

  if (deleteUserLoading) {
    return <ProgressWithMessage message="Deleting your User account" />;
  }

  if (appLoading) {
    return <ProgressWithMessage message="Loading Application" />;
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
