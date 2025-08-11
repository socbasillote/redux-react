import { registerUser, loginUser, logoutUser } from "../auth/authSlice";

export const saveAuthMiddleware = store => next => action => {
    const result = next(action);

    // Only save when these actions are dispatched
    if ([registerUser.type, loginUser.type, logoutUser.type].includes(action.type)) {
        const state = store.getState().auth;
        localStorage.setItem('authState', JSON.stringify(state));
    }
    
    return result;
};
