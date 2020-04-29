import { googleCloud } from '@myiworlds/credentials';
import { ProfileFactory } from '@myiworlds/factories';

export const appProfile = new ProfileFactory().use('PROFILE').createWithValues({
  id: googleCloud.applicationCreatorProfile,
  media: 'default-profile-media',
  userId: googleCloud.applicationCreatorUser,
  username: 'application-creator',
});
