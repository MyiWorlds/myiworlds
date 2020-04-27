import Error from '../../components/Error';
import firestoreClient from './../../lib/firebase/firestoreClient';
import guestProfile from './guestProfile';
import MaterialUiTheme from '../../components/Theme/MaterialUiTheme';
import ProgressWithMessage from './../../components/ProgressWithMessage/ProgressWithMessage';
import React, { useContext, useEffect, useState } from 'react';
import SelectProfileDialog from './components/SelectProfile/SelectProfileDialog';
import { CircleHydrated, UserProfileData, UserProfileHydrated } from '@myiworlds/types';
import { FIRESTORE_COLLECTIONS, RESPONSE_CODES } from '@myiworlds/enums';
import { getCookie, setCookie } from '../../functions/cookies';
import { ProviderStore } from './profileContextTypes.d';
import { SystemMessagesContext } from './../SystemMessages/SystemMessagesContext';
import { Theme } from '@material-ui/core/styles';
import { useDocument } from 'react-firebase-hooks/firestore';
import { UserContext } from '../User/UserContext';
import {
  useCreateProfileMutation,
  useGetProfileByIdQuery,
  useGetProfileByUsernameQuery,
  useUpdateProfileMutation,
  UpdateProfileMutationVariables,
} from '../../generated/apolloComponents';

export const ProfileContext = React.createContext({} as ProviderStore);
type SubscriptionToSelecetedProfile = null | (() => void);

const ProfileProvider = ({ children }: any) => {
  const { user } = useContext(UserContext);
  const { setAppSnackbar } = useContext(SystemMessagesContext);
  const [profileIdToSelect, setProfileIdToSelect] = useState<null | string>(
    null,
  );
  const [usernameToCreate, setUsernameToCreate] = useState<string>('');
  const [selectedProfile, setSelectedProfile] = useState<UserProfileHydrated>(
    guestProfile,
  );
  const [searchTimeoutActive, setSearchTimeoutActive] = useState(false);
  const [checkUsername, setCheckUsername] = useState(false);
  const [usernameAvailable, setUsernameAvailable] = useState(false);
  const [usernameInvalid, setUsernameInvalid] = useState(false);
  const [
    selectedProfileSubscription,
    setSelectedProfileSubscription,
  ] = useState<SubscriptionToSelecetedProfile>(null);
  const [updateProfileVariables, setUpdateProfileVariables] = useState<
    UpdateProfileMutationVariables
  >({
    id: selectedProfile.id,
    merge: true,
  });

  const [themeData, loadingTheme, errorTheme] = useDocument(
    firestoreClient.collection(FIRESTORE_COLLECTIONS.CIRCLES).doc(selectedProfile.theme && selectedProfile.theme.id ? selectedProfile.theme.id : 'theme'),
  );

  const [
    createProfile,
    {
      data: createProfileData,
      loading: createProfileLoading,
      error: createProfileError,
    },
  ] = useCreateProfileMutation({
    variables: {
      username: usernameToCreate,
    },
  });

  const [
    updateProfile,
    {
      data: updateProfileData,
    },
  ] = useUpdateProfileMutation({
    variables: updateProfileVariables,
  });

  const profileUpdated = () => {
    if (updateProfileData?.updateProfile?.status === RESPONSE_CODES.SUCCESS) {
      setAppSnackbar({
        title: updateProfileData.updateProfile.message || '',
        autoHideDuration: 2000,
      });
    } else if (updateProfileData?.updateProfile?.status === RESPONSE_CODES.ERROR) {
      setAppSnackbar({
        title: updateProfileData.updateProfile.message || '',
        autoHideDuration: 2000,
      });
    }
  }

  const updateSelectedProfileAddToHistory = () => {
    setSelectedProfile({
      ...selectedProfile,
      addToHistory: !selectedProfile.addToHistory,
    });
    setUpdateProfileVariables({
      id: selectedProfile.id,
      merge: true,
      addToHistory: !selectedProfile.addToHistory,
    });
  };

  const updateProfileMutation = () => {
    if (selectedProfile.id !== 'guest') {
      updateProfile();
    }
  };

  const updateProfileWithCreatedProfile = () => {
    if (
      createProfileData &&
      createProfileData.createProfile &&
      createProfileData.createProfile.createdDocumentId
    ) {
      setCookie(
        'selectedProfileId',
        createProfileData.createProfile.createdDocumentId,
      );
      setProfileIdToSelect(createProfileData.createProfile.createdDocumentId);
    }
  };

  const {
    data: getProfileQuery,
    loading: loadingGetProfile,
    error: errorGettingProfile,
  } = useGetProfileByIdQuery({
    fetchPolicy: 'no-cache',
    skip: !profileIdToSelect,
    variables: {
      id: profileIdToSelect as string,
    },
  });

  const updateSelectedProfile = () => {
    if (getProfileQuery && getProfileQuery.getProfileById) {
      console.log('Setting selected profile.')
      setSelectedProfile(getProfileQuery.getProfileById as UserProfileHydrated);
      subscribeToProfile();
    }
    // If you want to change the theme you need to update the circle by id in the app
    return;
  };

  const {
    data: getProfileByUsernameData,
    loading: getProfileByUsernameLoading,
    error: getProfileByUsernameError,
  } = useGetProfileByUsernameQuery({
    skip: !checkUsername || usernameToCreate === '',
    fetchPolicy: 'no-cache',
    variables: {
      username: usernameToCreate,
    },
  });

  const handleSettingUsernameAvailability = () => {
    let isUsernameAvailable = false;
    let isUsernameInvalid = false;

    if (getProfileByUsernameData) {
      const usernameAvailabilityResponse =
        getProfileByUsernameData.getProfileByUsername;
      isUsernameAvailable =
        usernameAvailabilityResponse &&
          usernameAvailabilityResponse.usernameAvailable
          ? true
          : false;
      isUsernameInvalid =
        (usernameAvailabilityResponse &&
          usernameAvailabilityResponse.usernameInvalid) ||
        !isUsernameAvailable;
    }

    setUsernameAvailable(isUsernameAvailable);
    setUsernameInvalid(isUsernameInvalid);
  };

  const handleUsernameToCreate = () => {
    if (usernameToCreate === '') {
      return;
    }

    const timeout = setTimeout(() => {
      setCheckUsername(true);
      setSearchTimeoutActive(false);
    }, 700);

    return () => clearTimeout(timeout);
  };

  const handleSetUsernameToCreate = (username: string) => {
    setCheckUsername(false);
    setUsernameToCreate(username);
    setUsernameAvailable(false);
    setUsernameInvalid(false);
    setSearchTimeoutActive(true);
  };

  const handleAutoLogInToProfile = () => {
    const previousLoggedInProfile = getCookie('selectedProfileId');

    if (
      previousLoggedInProfile &&
      previousLoggedInProfile !== '' &&
      selectedProfile.id === 'guest'
    ) {
      setProfileIdToSelect(previousLoggedInProfile);
    }
  };

  const subscribeToProfile = () => {
    if (selectedProfile && selectedProfile.id && selectedProfile.id !== 'guest' && !selectedProfileSubscription) {
      console.log(
        'Subscribing to the selected profile: ',
        selectedProfile.username,
      );
      const subscriptionToSelectedProfile = firestoreClient
        .collection(FIRESTORE_COLLECTIONS.PROFILES)
        .doc(selectedProfile.id)
        .onSnapshot(
          (docSnapshot: firebase.firestore.DocumentSnapshot) => {
            const profileDoc:
              | firebase.firestore.DocumentData
              | UserProfileData
              | undefined = docSnapshot.data();

            if (profileDoc && docSnapshot.exists) {
              console.log(
                'Selected profile fields have changed and I am going to refetch the profile.',
              );

              setProfileIdToSelect(profileDoc.id);
              return;
            } else {
              console.log(
                'That user no longer exist.  You have been logged in as a guest.',
              );
              // setUser(guestUser);
              // setUserIdToLogin(null);
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

      if (subscriptionToSelectedProfile) {
        // Used to cancel the subscription to the user
        console.log(
          'Subscribed to your selected profile.  Any changes made to the user will instantly update this app.',
        );
        setSelectedProfileSubscription(() => subscriptionToSelectedProfile);
      }
    }
  };

  if (loadingTheme) {
    console.log("Subscription to theme loading");
  }
  if (errorTheme) {
    console.log('Subscription to theme had an error');
  }

  const handleUpdateThemeSubscription = () => {
    const theme: CircleHydrated | null = themeData && themeData.data() ? (themeData.data() as CircleHydrated) : null;
    if (theme) {
      setSelectedProfile({
        ...selectedProfile,
        theme,
      })
      setAppSnackbar({
        title: 'Your theme has updated.',
        autoHideDuration: 2000,
      });
    }
  }

  useEffect(handleUpdateThemeSubscription, [themeData, loadingTheme]);

  useEffect(handleSettingUsernameAvailability, [getProfileByUsernameData]);
  useEffect(handleUsernameToCreate, [usernameToCreate]);
  useEffect(updateProfileWithCreatedProfile, [createProfileData]);
  useEffect(updateSelectedProfile, [getProfileQuery]);
  useEffect(handleAutoLogInToProfile, [user]);
  useEffect(profileUpdated, [updateProfileData]);
  useEffect(updateProfileMutation, [updateProfileVariables]);

  const handleCancelCreateProfile = () => {
    setUsernameToCreate('');
    setUsernameInvalid(false);
  };

  if (loadingGetProfile) {
    return <ProgressWithMessage message="Getting selected profile" />;
  }

  if (errorGettingProfile) {
    return (
      <Error
        error={errorGettingProfile}
        message={'There was an error getting the CreatedProfile'}
      />
    );
  }

  if (createProfileLoading) {
    return <ProgressWithMessage message="Saving Created Profile" />;
  }

  if (createProfileError) {
    return (
      <Error
        error={createProfileError}
        message={'There was an error loading your user account'}
      />
    );
  }

  if (getProfileByUsernameError) {
    return (
      <Error
        error={getProfileByUsernameError}
        message={'There was an checking to see if the username was available'}
      />
    );
  }

  const handleSelectProfile = (profileId: string) => {
    console.log('Selected new profile and setting cookie: ', profileId);
    setCookie('selectedProfileId', profileId);
    setProfileIdToSelect(profileId);
  };

  let content = null;

  if (
    (selectedProfile.id !== 'guest' && user.id) ||
    (!user.id && selectedProfile.id === 'guest')
  ) {
    content = children;
  } else {
    content = <SelectProfileDialog onSelect={handleSelectProfile} />;
  }

  return (
    <ProfileContext.Provider
      value={{
        creatingNew: true,
        selectedProfile,
        usernameToCreate,
        setUsernameToCreate: handleSetUsernameToCreate,
        createProfile,
        profileIdToSelect,
        handleSelectProfile,
        createProfileLoading,
        usernameAvailable,
        usernameInvalid,
        handleCancelCreateProfile,
        getProfileByUsernameLoading,
        searchTimeoutActive,
        updateProfile,
        updateSelectedProfileAddToHistory,
      }}
    >
      <MaterialUiTheme
        themeOverride={
          selectedProfile.theme &&
            selectedProfile.theme.data &&
            selectedProfile.theme.data.theme
            ? (selectedProfile.theme.data.theme as Theme)
            : undefined
        }
      >
        {content}
      </MaterialUiTheme>
    </ProfileContext.Provider>
  );
};

const ProfileConsumer = ProfileContext.Consumer;

export { ProfileProvider, ProfileConsumer };
