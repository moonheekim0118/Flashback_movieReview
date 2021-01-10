export const setItem = <T>(key: string, value: T) => {
  if (value === null || value === undefined) return;
  const toJson = JSON.stringify(value);
  localStorage.setItem(key, toJson);
};

export const getItem = (key: string) => {
  const value = localStorage.getItem(key);
  return value === null ? null : JSON.parse(value);
};
