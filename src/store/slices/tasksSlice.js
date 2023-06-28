import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../../utils/api';
import { hideLoader, showLoader } from './loaderSlice';

const initialState = {
    // tasks: [],
    isLoad: false,
    activeTaskId: null,
    tasks: {
        queue: [],
        dev: [],
        done: [],
    },
};

export const getTasks = createAsyncThunk(
    'tasks/getTasksList',
    async (_, { rejectWithValue, dispatch }) => {
        dispatch(showLoader());
        try {
            const tasksList = await api.getTasks();
            dispatch(hideLoader());
            const categorizedTasks = categorizeTasks(tasksList); 
            // console.log(categorizedTasks)
            return categorizedTasks;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);
const categorizeTasks = (tasksList) => {
    const categorizedTasks = {
        queue: [],
        dev: [],
        done: [],
    };

    tasksList.forEach((task) => {
        categorizedTasks[task.status].push(task);
    });

    return categorizedTasks;
};
// export const getTasks = createAsyncThunk(
//     'tasks/getTasksList',
//     async (_, { rejectWithValue, dispatch }) => {
//         dispatch(showLoader());
//         try {
//             const tasksList = await api.getTasks();
//             dispatch(hideLoader());
//             return tasksList;
//         } catch (error) {
//             return rejectWithValue(error.message);
//         }
//     }
// );

export const createTask = createAsyncThunk(
    'tasks/createTask',
    async (data, { rejectWithValue, dispatch }) => {
        try {
            await api.createTask(data);
            console.log('Task created successfully.');
            // dispatch(addTask(res))
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const deleteTask = createAsyncThunk(
    'tasks/deleteTask',
    async (taskId, { rejectWithValue, dispatch }) => {
        try {
            await api.deleteTask(taskId);
            console.log(`Task with ID ${taskId} deleted.`);
            // dispatch(removeTask(taskId))
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const taskSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        addTask(state, action) {
            state.tasks.push(action.payload);
        },
        removeTask(state, action) {
            const taskId = action.payload;
            state.tasks = state.tasks.filter((task) => task.objectId !== taskId);
        },
        updateTask(state, action) {
            
        },
        setActiveTaskId(state, action) {
            state.activeTaskId = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getTasks.pending, (state) => {
                state.isLoad = true;
            })
            .addCase(getTasks.fulfilled, (state, action) => {
                state.tasks = action.payload;
                // state.taskStatus = action.payload; // Обновление taskStatus
                state.isLoad = false;
            })
            .addCase(getTasks.rejected, (state) => {
                state.isLoad = false;
            });
    },

    // extraReducers: (builder) => {
    //     builder
    //         .addCase(getTasks.pending, (state) => {
    //             state.isLoad = true;
    //         })
    //         .addCase(getTasks.fulfilled, (state, action) => {
    //             state.tasks = action.payload;
    //             state.isLoad = false;
    //         })
    //         .addCase(getTasks.rejected, (state) => {
    //             state.isLoad = false;
    //         });
    // },
});

export const { addTask, removeTask, updateTask, setActiveTaskId } = taskSlice.actions;
export default taskSlice.reducer;
