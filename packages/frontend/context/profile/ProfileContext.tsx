import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CreateProfile from './components/CreateProfile';
import Error from '../../components/Error';
import ExapandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import guestProfile from './guestProfile';
import MaterialUiTheme from '../../lib/MaterialUiTheme';
import React, { useContext, useEffect, useState } from 'react';
import SelectProfileDialog from './components/SelectProfile/SelectProfileDialog';
import Typography from '@material-ui/core/Typography';
import { CreatedProfile, SelectedProfile } from '@myiworlds/types';
import { eraseCookie, getCookie, setCookie } from '../../functions/cookies';
import { ProviderStore } from './profileContextTypes.d';
import { UserContext } from '../user/UserContext';
import {
  useCreateProfileMutation,
  useGetProfileByIdQuery,
  useGetProfileByUsernameQuery,
} from '../../generated/apolloComponents';

export const ProfileContext = React.createContext({} as ProviderStore);

const ProfileProvider = ({ children }: any) => {
  const { user } = useContext(UserContext);
  const [profileIdToSelect, setProfileIdToSelect] = useState<null | string>(
    null,
  );
  const [usernameToCreate, setUsernameToCreate] = useState<string>('');
  const [selectedProfile, setSelectedProfile] = useState<SelectedProfile>(
    guestProfile,
  );
  const [searchTimeoutActive, setSearchTimeoutActive] = useState(false);
  const [checkUsername, setCheckUsername] = useState(false);
  const [usernameAvailable, setUsernameAvailable] = useState(false);
  const [usernameInvalid, setUsernameInvalid] = useState(false);

  const [
    createProfile,
    {
      data: createProfileData,
      loading: createProfileLoading,
      error: createProfileError,
    },
  ] = useCreateProfileMutation({
    variables: {
      username: usernameToCreate!,
    },
  });

  const updateProfileWithCreatedProfile = () => {
    if (
      createProfileData &&
      createProfileData.createProfile &&
      createProfileData.createProfile.createdProfile
    ) {
      setSelectedProfile(createProfileData.createProfile
        .createdProfile as SelectedProfile);
    }
  };

  const {
    data: getProfileQuery,
    loading: loadingGetProfile,
    error: errorGettingProfile,
  } = useGetProfileByIdQuery({
    skip:
      !profileIdToSelect ||
      Boolean(
        selectedProfile.id !== 'guest' &&
          selectedProfile.id === profileIdToSelect,
      ),
    variables: {
      id: profileIdToSelect!!,
    },
  });

  const updateSelectedProfile = () => {
    if (getProfileQuery && getProfileQuery.getProfileById) {
      setSelectedProfile(getProfileQuery.getProfileById as SelectedProfile);
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
    let usernameAvailable = false;
    let usernameInvalid = false;

    if (getProfileByUsernameData) {
      const usernameAvailabilityResponse =
        getProfileByUsernameData.getProfileByUsername;
      usernameAvailable =
        usernameAvailabilityResponse &&
        usernameAvailabilityResponse.usernameAvailable
          ? true
          : false;
      usernameInvalid =
        (usernameAvailabilityResponse &&
          usernameAvailabilityResponse.usernameInvalid) ||
        !usernameAvailable;
    }

    setUsernameAvailable(usernameAvailable);
    setUsernameInvalid(usernameInvalid);
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

  const updatedSelectedProfileOnUserChange = () => {
    const loggedInUserHasSelectedProfile = user.profiles.find(
      (profile: CreatedProfile | SelectedProfile) =>
        profile.id === selectedProfile.id,
    );
    console.log(loggedInUserHasSelectedProfile, selectedProfile);
    if (!loggedInUserHasSelectedProfile) {
      setSelectedProfile(guestProfile);
      setProfileIdToSelect(null);
    }
  };

  const handleAutoLogInToProfile = () => {
    const previousLoggedInProfile = getCookie('selectedProfileId');
    if (previousLoggedInProfile) {
      const isOneOfUsersProfiles = user.profiles.find(
        (profile: CreatedProfile | SelectedProfile) =>
          profile.id === previousLoggedInProfile,
      );
      if (isOneOfUsersProfiles) {
        setProfileIdToSelect(previousLoggedInProfile);
      } else {
        eraseCookie('selectedProfileId');
      }
    }
  };

  useEffect(handleAutoLogInToProfile, [user.profiles]);
  useEffect(handleSettingUsernameAvailability, [getProfileByUsernameData]);
  useEffect(handleUsernameToCreate, [usernameToCreate]);
  useEffect(updateProfileWithCreatedProfile, [createProfileData]);
  useEffect(updateSelectedProfile, [getProfileQuery]);
  useEffect(updatedSelectedProfileOnUserChange, [
    selectedProfile,
    selectedProfile.id,
    user,
  ]);

  const handleCancelCreateProfile = () => {
    setUsernameToCreate('');
    // setCheckUsername(false);
    setUsernameInvalid(false);
  };

  if (loadingGetProfile) {
    return <h1>loading Get Profile</h1>;
  }

  if (errorGettingProfile) {
    return (
      <Error
        error={errorGettingProfile}
        message={'There was an error getting the '}
      />
    );
  }

  if (createProfileLoading) {
    return <h1>Saving Profile</h1>;
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
    setProfileIdToSelect(profileId);
    setCookie('selectedProfileId', profileId);
  };

  let content = null;

  if (user.id && selectedProfile.id === 'guest') {
    console.log('no profile');
    if (!user.profiles.length) {
      console.log('Force user to create account before moving on');
      content = (
        <ExpansionPanel>
          <ExpansionPanelSummary
            expandIcon={<ExapandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>Create New Profile</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails></ExpansionPanelDetails>
        </ExpansionPanel>
      );
    }

    console.log(
      "Force user to select a profile to continue with or create a new profile (if they havn't maxed out)",
    );

    content = (
      <div style={{ margin: '0px auto' }}>
        <SelectProfileDialog
          profiles={user.profiles}
          onSelect={handleSelectProfile}
        />
        <Card>
          <CardHeader title="Create Profile" />
          <CardContent>
            <CreateProfile />
          </CardContent>
        </Card>
      </div>
    );
  } else {
    // Guest is logged in
    content = children;
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
        setProfileIdToSelect,
        createProfileLoading,
        usernameAvailable,
        usernameInvalid,
        handleCancelCreateProfile,
        getProfileByUsernameLoading,
        searchTimeoutActive,
      }}
    >
      <MaterialUiTheme>{content}</MaterialUiTheme>
    </ProfileContext.Provider>
  );
};

const ProfileConsumer = ProfileContext.Consumer;

export { ProfileProvider, ProfileConsumer };
