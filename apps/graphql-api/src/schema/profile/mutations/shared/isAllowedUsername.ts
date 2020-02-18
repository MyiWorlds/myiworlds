export const isAllowedUsername = (username: string) => {
  const bannedUsernames = [
    '',
    'test',
    'null',
    'undefined',
    'nan',
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
    'circles-clones',
    'profiles',
    'profiles-clones',
    'users',
    'users-clones',
    'does-not-exist',
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
