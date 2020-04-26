export const isCreator = (
  creator: string | undefined,
  selectedProfileId: string,
) => {
  if (!creator) {
    return false;
  } else {
    return creator === selectedProfileId;
  }
};
