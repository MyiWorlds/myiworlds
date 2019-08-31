import Error from '../../components/Error';
import guestUser from './guestUser';
import React, { useEffect, useState } from 'react';
import { CREATE_USER } from './CREATE_USER';
import { firebase, firestore } from '../../lib/firebase';
import { GET_USER } from './GET_USER';
import { ProviderStore } from './userContext.d';
import { useMutation, useQuery } from '@apollo/react-hooks';

export const UserContext = React.createContext({} as ProviderStore);

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(guestUser);
  const [userId, setUserId] = useState(null);
  const [appLoading, setAppLoading] = useState(true);
  const [isNewUser, setIsNewUser] = useState(false);
  const [userEmail, setUserEmail] = useState(null);
  const [subscribedUser, setSubscribedUser] = useState(null);
  const [
    createUser,
    {
      data: createUserData,
      loading: createUserLoading,
      error: createUserError,
    },
  ] = useMutation(CREATE_USER, {
    variables: {
      id: userId,
      email: userEmail,
    },
  });

  const { data: getUserQuery, loading, error } = useQuery(GET_USER, {
    skip: !userId || user.id === userId,
  });

  const updateUserData = () => {
    if (getUserQuery && getUserQuery.getUserById) {
      setUser(getUserQuery.getUserById);
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
            console.log('docSnapshot', docSnapshot.data());
            const userDoc: firebase.firestore.DocumentData = docSnapshot.data();

            if (userDoc) {
              const currentUserProperties = Object.getOwnPropertyNames(user);
              const usersFieldsAreDifferent = currentUserProperties.every(
                userProperty => user[userProperty] === userDoc[userProperty],
              );
              if (usersFieldsAreDifferent) {
                console.log('Users fields have changed and am updating them');
                setUserId(user.id);
              }
            }
          },
          error => {
            console.error(error);
          },
        );

      console.log('Subscribed', userSubscription);
      setSubscribedUser(() => userSubscription);
    }
  };

  const handleLogout = () => {
    console.log('Logging you out');
    if (subscribedUser) {
      subscribedUser();
    }
    document.cookie = 'token=;';
    setSubscribedUser(null);
    setUserId(null);
    setUser(guestUser);
    firebase.auth().signOut();
  };

  const didMount = () => {
    firebase
      .auth()
      .getRedirectResult()
      .then((comingFromGoogleLoginRedirect: firebase.auth.UserCredential) => {
        if (
          comingFromGoogleLoginRedirect &&
          comingFromGoogleLoginRedirect.user &&
          comingFromGoogleLoginRedirect.additionalUserInfo.isNewUser
        ) {
          console.log('New User going to start creation flow');
          setUserEmail(comingFromGoogleLoginRedirect.user.email);
          setUserId(comingFromGoogleLoginRedirect.user.uid);
          setIsNewUser(true);
        } else if (
          comingFromGoogleLoginRedirect &&
          comingFromGoogleLoginRedirect.user &&
          !comingFromGoogleLoginRedirect.additionalUserInfo.isNewUser &&
          comingFromGoogleLoginRedirect.credential
        ) {
          console.log('Redirect login handler');
          const token = (comingFromGoogleLoginRedirect.credential as firebase.auth.OAuthCredential)
            .idToken;
          document.cookie = `token=${token}`;
          setUserId(comingFromGoogleLoginRedirect.user.uid);
        }
      });

    firebase.auth().onAuthStateChanged(async (firebaseUser: firebase.User) => {
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
    const createUserIfNew = async () => {
      if (isNewUser && userId) {
        await createUser();
        setIsNewUser(false);
      }
    };
    createUserIfNew();
  };

  const updateUserWithCreatedUser = () => {
    if (
      createUserData &&
      createUserData.createUser &&
      createUserData.createUser.createdUser
    ) {
      setUser(createUserData.createUser.createdUser);
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
        error={error}
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
