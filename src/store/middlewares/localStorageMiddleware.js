import { setUser } from "../slices/userSlice";
const localStorageMiddleware = (store) => (next) => (action) => {
    // Сохранение данных в локальное хранилище
    if (action.type === setUser.type) {
        const { user } = store.getState();
        localStorage.setItem('userData', JSON.stringify(user));
    }

    return next(action);
};

export default localStorageMiddleware;
