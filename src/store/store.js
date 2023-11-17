import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga'
import tasksSlice from './slices/tasksSlice';
import projectSlice from './slices/projectSlice'
import popupSlice from './slices/popupSlice'
import loaderSlice from './slices/loaderSlice';
import sideMenuSlice from './slices/sideMenuSlice';
import userSlice from './slices/userSlice';
import themeSlice from './slices/themeSlice';
import rootSaga from './rootSaga';
const sagaMiddleware = createSagaMiddleware();

export default configureStore ({
    reducer: {
        tasks: tasksSlice,
        popup: popupSlice,
        projects: projectSlice,
        loader: loaderSlice,
        sideMenu: sideMenuSlice,
        user: userSlice,
        theme: themeSlice,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(sagaMiddleware),

})