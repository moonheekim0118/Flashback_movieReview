// Session Storage 관련 연산들

export const getItem = (key: string) => {
  const value = sessionStorage.getItem(key);
  return value === null ? null : JSON.parse(value);
};

export const setItem = <T>(key: string, value: T) => {
  if (value === null || value === undefined) return;
  const toJson = JSON.stringify(value);
  sessionStorage.setItem(key, toJson);
};

export const removeItem = (key: string) => {
  sessionStorage.removeItem(key);
};
