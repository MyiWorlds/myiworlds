import Avatar from '@material-ui/core/Avatar';
import Error from '../../Error';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Media from './../../Media/Media';
import Progress from './../../Progress/Progress';
import React, { useContext, useEffect } from 'react';
import { ProfileContext } from './../../../contexts/Profile/ProfileContext';
import { useGetUserProfilesLazyQuery } from '../../../generated/apolloComponents';
import { UserProfileHydrated } from '@myiworlds/types';

const ProfileSelector = () => {
  const [getProfiles, {loading:  getUserProfilesLoading, data: getUserProfilesQuery, error: getUserProfilesError}] = useGetUserProfilesLazyQuery();
  const { selectedProfile, handleSelectProfile } = useContext(ProfileContext);

  useEffect(getProfiles, [])

  let content = null;

  if (getUserProfilesLoading) {
    content = <Progress />
  }

  if (getUserProfilesError) {
    content = (
      <Error
      error={getUserProfilesError}
      message={'There was an error getting the '}
    />
    )
  }

  if (getUserProfilesQuery && getUserProfilesQuery?.getUserProfiles && getUserProfilesQuery.getUserProfiles.length) {
    const profiles = getUserProfilesQuery.getUserProfiles as UserProfileHydrated[];
    content = (
      <List>
        {profiles.map((profile: UserProfileHydrated) => (
              <ListItem
                button
                onClick={() => handleSelectProfile(profile.id)}
                key={profile.id}
                selected={profile.id === selectedProfile.id}
              >
                {profile.media && (
                  <ListItemAvatar>
                  <Avatar>
                    <Media circle={profile.media} />
                  </Avatar>
                </ListItemAvatar>
                )}
                <ListItemText primary={profile.username} />
              </ListItem>
            ))}
        </List>
    )
  }

  return content;
}

export default ProfileSelector;
