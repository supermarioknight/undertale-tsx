export const rand = <T extends {}>(values: T[], exclude?: T): T => {
  const excludedValues = values.filter(val => val !== exclude);
  return excludedValues[Math.ceil(Math.random() * 100) % excludedValues.length];
};
