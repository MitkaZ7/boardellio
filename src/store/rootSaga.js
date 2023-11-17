// rootSaga.js
import { all } from 'redux-saga/effects';
import { userSagas } from './sagas/userSagas'; // Импортируйте ваши саги

export default function* rootSaga() {
    yield all([
        ...userSagas,
        // Добавьте другие саги по необходимости
    ]);
}
