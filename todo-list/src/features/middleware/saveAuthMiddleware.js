
export const saveAuthMiddleware = store => next => action => {
    const result = next(action);
    const state = store.getState().auth;
    localStorage.setItem('authState', JSON.stringify(state));
    return result;
};
