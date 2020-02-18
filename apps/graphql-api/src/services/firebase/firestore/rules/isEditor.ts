export const isEditor = (editors: string[], user: string) => {
  return editors && editors.includes(user);
};
