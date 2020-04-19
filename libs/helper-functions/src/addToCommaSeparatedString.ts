export const addToCommaSeparatedString = (list: string, adding: string) => {
  if (list === '') {
    return adding;
  } else {
    return `${list + ', ' + adding}`;
  }
};
