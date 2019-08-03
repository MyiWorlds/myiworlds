// If you update this function to add more items
// you must update the ProfileUsernameEditor Component
// description to the user
export const isAllowedUsername = (username: string) => {
  const bannedUsernames = [
    '',
    'test',
    'app',
    'admin',
    'user',
    'myiworlds',
    'account',
    'accounts',
    'admins',
    'props',
    'state',
    'context',
    'selectedProfile',
    'circles',
    'profiles',
    'users',
  ];
  const notBannedUsername = !bannedUsernames.includes(username);

  const isLongEnough = username.length > 3;
  const isShortEnough = username.length < 120;
  const isOnlyAllowedCharacters = username.match(/^[-_a-z0-9]+$/);

  return (
    notBannedUsername &&
    isLongEnough &&
    isShortEnough &&
    isOnlyAllowedCharacters
  );
};
