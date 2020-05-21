export const makeId = (prefix) => {
  let n = 1;
  return () => {
    return prefix + n++;
  };
};
