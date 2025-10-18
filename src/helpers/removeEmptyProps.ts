export const removeEmptyProps = (obj: unknown, isRemoveFalse: boolean = false) => {
  if (!obj) {
    return {};
  }

  const newObj = { ...obj } as Record<string, unknown>;
  Object.entries(newObj)
    .filter((item) => {
      const val = item[1];
      return (
        (typeof val === 'boolean' && isRemoveFalse && !val) ||
        (typeof val !== 'number' && typeof val !== 'boolean' && !val) || // if empty string/null/undefined
        (Array.isArray(val) && val.length === 0)
      ); // if empty array
    })
    .forEach((item) => delete newObj[item[0]]);
  return newObj;
};
