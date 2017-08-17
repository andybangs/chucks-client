export const loadState = key => {
  try {
    const serializedState = localStorage.getItem(key);
    if (serializedState === null) {
      return undefined;
    }

    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

export const saveState = (key, val) => {
  try {
    const serializedState = JSON.stringify({
      data: val,
      lastSaved: Date.now()
    });

    localStorage.setItem(key, serializedState);
  } catch (err) {
    // Ignore write errors
  }
};
