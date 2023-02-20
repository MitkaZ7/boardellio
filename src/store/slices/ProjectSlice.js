import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { hideLoader, showLoader } from './loaderSlice';
import api from '../../utils/api'
const initialState = {
    projects: [],
    isLoad: false,
};
function isPendingAction(action) {
    return action.type.endsWith('/pending')
}
export const getProjects = createAsyncThunk(
    'projects/getProjectsList',
    async (_,{ rejectWithValue,dispatch}) => {
        dispatch(showLoader())
        try {
            const projectsList = await api.getProjects();
            dispatch(hideLoader())
            // console.log(projectsList)
            return projectsList;
        } catch (error) {
            return rejectWithValue((error.message))
        }
    }
)
const projectSlice = createSlice({
    name: 'projects',
    initialState,
    reducers: {
        addProject(state, action) {
            state.projects.push(action.payload)
        },
        updateProject(state, action) {

        },
       
    },
    extraReducers: (builder) => {
        builder
            .addMatcher(isPendingAction, (state, action) => {
                state[action.meta.requestId] = 'pending';
          
            })
            .addMatcher(
                (action) => action.type.startsWith('projects'),
            )
            // .addMatcher(
            //     (action) => action.type.endsWith('pending'),
            //     (state, action) => {
            //         console.log(state)
            //     }
                
            // )
            .addMatcher(
                // matcher can be defined inline as a type predicate function
                (action) => action.type.endsWith('/rejected'),
                (state, action) => {
                    state[action.meta.requestId] = 'rejected'
                }
            )
            .addMatcher(
                (action) => action.type.endsWith('/fulfilled'),
                (state, action) => {
                    state.projects = action.payload;
                    state.isLoad = true;
                    state[action.meta.requestId] = 'fulfilled'
                   
                }
            )
    }
})
export const { addProject, updateProject } = projectSlice.actions;
export default projectSlice.reducer;