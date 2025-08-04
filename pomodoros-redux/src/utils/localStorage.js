export const saveToLocalStorage = (key, value) => {
  try {
    const serialized = JSON.stringify(value);
    localStorage.setItem(key, serialized);
  } catch (e) {
    console.error('Save error', e);
  }
};

export const loadFromLocalStorage = (key, fallback = undefined) => {
  try {
    const stored = localStorage.getItem(key);
    if (stored === null) return fallback;
    return JSON.parse(stored);
  } catch (e) {
    console.error('Load error', e);
    return fallback;
  }
};
