import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { hideLoader, showLoader } from './loaderSlice';
import { closePopup } from './popupSlice';
import api from '../../utils/api';

const initialState = {
    projects: [],
    isLoad: false,
};

function isPendingAction(action) {
    return action.type.endsWith('/pending');
}

export const getProjects = createAsyncThunk(
    'projects/getProjectsList',
    async (_, thunkAPI) => {
        const { dispatch, rejectWithValue } = thunkAPI;
        
        try {
            dispatch(showLoader());
            const projectsList = await api.getProjects();
            dispatch(hideLoader());
            console.log(projectsList);
            return projectsList;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const createProject = createAsyncThunk(
    'projects/createProject',
    async (data, thunkAPI) => {
        const { dispatch, rejectWithValue } = thunkAPI;
        dispatch(showLoader());
        try {
            await api.createProject(data);
            dispatch(hideLoader());
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const projectSlice = createSlice({
    name: 'projects',
    initialState,
    reducers: {
        addProject(state, action) {
            state.projects.push(action.payload);
        },
        updateProject(state, action) { },
    },
    extraReducers: (builder) => {
        builder
            .addMatcher(
                isPendingAction,
                (state, action) => {
                    state[action.meta.requestId] = 'pending';
                }
            )
            .addMatcher(
                (action) => action.type.startsWith('projects'),
            )
            .addMatcher(
                (action) => action.type.endsWith('/rejected'),
                (state, action) => {
                    state[action.meta.requestId] = 'rejected';
                }
            )
            .addMatcher(
                (action) => action.type.endsWith('/fulfilled'),
                (state, action) => {
                    const { dispatch } = builder;
                    if (action.type === createProject.fulfilled.toString()) {
                        state.projects.push(action.payload);
                        // dispatch(closePopup());
                      
                    } else {
                        state.projects = action.payload;
                        state.isLoad = true;
                    }
                    state[action.meta.requestId] = 'fulfilled';
                }
            );
    },
});

export const { addProject, updateProject } = projectSlice.actions;
export default projectSlice.reducer;
