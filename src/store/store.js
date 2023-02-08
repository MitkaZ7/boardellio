import { configureStore } from '@reduxjs/toolkit';
import taskSlice from './slices/TaskSlice';
import projectSlice from './slices/ProjectSlice'

export default configureStore ({
    reducer: {
        task: taskSlice,
        project: projectSlice,
    }
       
})