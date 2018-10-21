export const limit = (num: number, minMax: [number, number]): number => {
  const [min, max] = minMax;
  if (num < min) {
    return min;
  }

  if (num > max) {
    return max;
  }

  return num;
};
