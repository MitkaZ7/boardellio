// userSagas.js
import { takeLatest, put, call } from 'redux-saga/effects';
import authApi from '../../utils/authApi';
import { setUser, setError } from '../slices/userSlice';

export function* createUserSaga(action) {
    try {
        const res = yield call(authApi.register, action.payload);
        yield put(setUser(res.data));
    } catch (error) {
        yield put(setError(error.message));
    }
}

export function* authorizeUserSaga(action) {
    try {
        const res = yield call(authApi.authorize, action.payload);
        yield put(setUser(res.data));
    } catch (error) {
        yield put(setError(error.message));
    }
}

// Экспортируем все саги как объект
export const userSagas = {
    createUserSaga,
    authorizeUserSaga,
};
