export function clearLocalStorage(key) {
  return localStorage.removeItem(key);
}

export function getLocalStorage(key) {
  const data = localStorage.getItem(key);

  try {
    return JSON.parse(data);
  } catch (err) {
    console.error(`Error getting item ${key} from localStorage`, err);
  }
}

export function setLocalStorage(key, value) {
  if (value && typeof (value) === 'string') {
    localStorage.setItem(key, value);
  } else {
    localStorage.setItem(key, JSON.stringify(value));
  }
}