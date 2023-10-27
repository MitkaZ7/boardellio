import { configureStore } from '@reduxjs/toolkit';

import tasksSlice from './slices/tasksSlice';
import projectSlice from './slices/projectSlice'
import popupSlice from './slices/popupSlice'
import loaderSlice from './slices/loaderSlice';
import sideMenuSlice from './slices/sideMenuSlice';

export default configureStore ({
    reducer: {
        tasks: tasksSlice,
        popup: popupSlice,
        projects: projectSlice,
        loader: loaderSlice,
        sideMenu: sideMenuSlice,

    }
       
})