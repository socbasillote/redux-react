
const localStorageMiddleWare = store => next => action => {
    const result = next(action);

    const { habits, settings } = store.getState();

    localStorage.setItem('habits', JSON.stringify(habits));
    localStorage.setItem('settings', JSON.stringify(settings));

    return result;
}

export default localStorageMiddleWare;