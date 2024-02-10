import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { hideLoader, showLoader } from './loaderSlice';
import { closePopup } from './popupSlice';
import api from '../../utils/api';

const getInitialSelectedProject = () => {
    const storedSelectedProject = localStorage.getItem('selectedProject');
    if (storedSelectedProject) {
        return JSON.parse(storedSelectedProject);
    }
    return { projectId: null, projectName: null };
};

const initialState = {
    projects: [],
    isLoad: false,
    selectedProject: getInitialSelectedProject(),
};

function isPendingAction(action) {
    return action.type.endsWith('/pending');
}

export const getProjects = createAsyncThunk(
    'projects/getProjectsList',
    async (_, thunkAPI) => {
        const { dispatch, rejectWithValue } = thunkAPI;
        try {
            // dispatch(showLoader());
            const projects = await api.getProjects();
            const projectsList = Object.keys(projects).map((id) => ({
                id,
                ...projects[id],
            }));
           
            // dispatch(hideLoader());
            return projectsList;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

// export const getOneProject = createAsyncThunk(
//     'projects/getOnePeoject',
//     async (projectId, thunkAPI) => {
//         const { dispatch, rejectWithValue } = thunkAPI;
//         try {
//             const project = await api.getProjectById(projectId);
//             console.log(project)
//             return project;
//         } catch (error) {
//             return rejectWithValue(error.message);
//         }
//     }
// )

export const createProject = createAsyncThunk(
    'projects/createProject',
    async (data, thunkAPI) => {
        const { dispatch, rejectWithValue } = thunkAPI;
        dispatch(showLoader());
        try {
            console.log(data)
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
        updateProject(state, action) {},
        selectProject(state,action) {
            state.selectedProject = action.payload;
            localStorage.setItem('selectedProject', JSON.stringify(action.payload))
        },
        resetSelectedProjectId: (state) => {
            state.selectedProjectId = null;
            localStorage.removeItem('selectedProjectId'); 
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getProjects.fulfilled, (state, action) => {
                // console.log('Projects loaded:', action.payload);
                state.projects = action.payload;
            })

            .addCase(getProjects.rejected, (state, action) => {
                state.error = action.payload;
            })

            .addMatcher(
                (action) => action.type.endsWith('/fulfilled'),
                (state, action) => {
                    // const { dispatch } = builder;
                    // if (action.type === createProject.fulfilled.toString()) {

                      
                    // } else {
                    //     // state.projects = action.payload;
                    //     // state.isLoad = true;
                    // }
                    state[action.meta.requestId] = 'fulfilled';
                }
            );
    },
});

export const { addProject, updateProject, selectProject, resetSelectedProjectId } = projectSlice.actions;
export default projectSlice.reducer;
