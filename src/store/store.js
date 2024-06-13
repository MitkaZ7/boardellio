import { configureStore } from '@reduxjs/toolkit';

import tasksSlice from './slices/tasksSlice';
import projectSlice from './slices/projectSlice'
import popupSlice from './slices/popupSlice'
import loaderSlice from './slices/loaderSlice';
import sideMenuSlice from './slices/sideMenuSlice';
import userSlice from './slices/userSlice';
import themeSlice from './slices/themeSlice';
import projectsMenuSlice from './slices/projectsMenuSlice';
import tooltipSlice from './slices/tooltipSlice';
import errorTransformMiddleware from './middlewares/errorTransformMiddleware';
import localStorageMiddleware from './middlewares/localStorageMiddleware';
import rejectionMiddleware from './middlewares/rejectionMiddleware'
export default configureStore ({
    reducer: {
        tasks: tasksSlice,
        popup: popupSlice,
        projects: projectSlice,
        projectsMenu: projectsMenuSlice,
        loader: loaderSlice,
        sideMenu: sideMenuSlice,
        user: userSlice,
        theme: themeSlice,
        tooltip: tooltipSlice,

    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware().concat(errorTransformMiddleware, rejectionMiddleware, ),
    
       
})