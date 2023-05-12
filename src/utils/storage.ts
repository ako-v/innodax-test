export const getFromLocalStorage = (key: string) => {
  const obj = localStorage.getItem(key);
  if (obj && obj.length) {
    return JSON.parse(obj);
  } else return undefined;
};

export const saveToLocalStorage = (key: string, item: any) => {
  localStorage.setItem(key, JSON.stringify(item));
};

export const removeFromLocalStorage = (key: string) => {
  localStorage.removeItem(key);
};
