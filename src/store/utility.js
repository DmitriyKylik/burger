export const updateObject = (oldState, updatedValue) => {
  return {
    ...JSON.parse(JSON.stringify(oldState)),
    ...JSON.parse(JSON.stringify(updatedValue)),
  };
};
