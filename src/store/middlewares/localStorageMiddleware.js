import { setUser, authorizeUser, setAuthorizationStatus } from "../slices/userSlice";
const localStorageMiddleware = (store) => (next) => (action) => {
    const result = next(action);
    if (action.type === setUser.type || action.type === setAuthorizationStatus.type) {
        const { user } = store.getState();
        // console.log('Saving user data to localStorage:', user);
        localStorage.setItem('userData', JSON.stringify(user));
    }
    return result;
};

export default localStorageMiddleware;
