export const zerify = n => (n < 10 ? '0' + n : '' + n);

export const getDuration = timeInSeconds => {
  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = Math.floor(timeInSeconds % 60);

  return {
    minutes,
    seconds,
    toString: () => `${zerify(minutes)}:${zerify(seconds)}`,
  };
};
