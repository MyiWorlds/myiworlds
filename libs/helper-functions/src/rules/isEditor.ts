export const isEditor = (
  editors: string[] | undefined,
  selectedProfileId: string,
) => {
  return editors && editors.length && editors.includes(selectedProfileId);
};
