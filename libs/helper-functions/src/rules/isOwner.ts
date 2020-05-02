export const isOwner = (
  owner: string | undefined,
  selectedProfileId: string,
) => {
  return owner && owner === selectedProfileId;
};
