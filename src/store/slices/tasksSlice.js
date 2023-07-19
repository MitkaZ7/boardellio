import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../../utils/api';
import { hideLoader, showLoader } from './loaderSlice';

const initialState = {
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
    async (_, { rejectWithValue, dispatch, getState }) => {
        dispatch(showLoader());
        try {
            const currentProjectId = getState().projects.selectedProjectId;
            const tasksList = await api.getProjectTasks(currentProjectId);
            dispatch(hideLoader());
            const categorizedTasks = categorizeTasks(tasksList);
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

export const createTask = createAsyncThunk(
    'tasks/createTask',
    async (data, { rejectWithValue, dispatch }) => {
        try {
            await api.createTask(data);
            console.log('Task created successfully.');
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
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const updateTaskStatus = createAsyncThunk(
    'tasks/updateTaskStatus',
    async ({ taskId, previousStatus, newStatus }, { rejectWithValue, dispatch }) => {
        try {
            await api.updateTask(taskId, { status: newStatus });
            console.log(`Task with ID ${taskId} status changed from ${previousStatus} to ${newStatus}.`);
            return { taskId, newStatus };
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
            const { status } = action.payload;
            state.tasks[status].push(action.payload);
        },
        removeTask(state, action) {
            const taskId = action.payload;
            state.tasks.queue = state.tasks.queue.filter((task) => task.objectId !== taskId);
            state.tasks.dev = state.tasks.dev.filter((task) => task.objectId !== taskId);
            state.tasks.done = state.tasks.done.filter((task) => task.objectId !== taskId);
        },
        updateTask(state, action) {
            
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getTasks.pending, (state) => {
                state.isLoad = true;
            })
            .addCase(getTasks.fulfilled, (state, action) => {
                state.tasks = action.payload;
                state.isLoad = false;
            })
            .addCase(getTasks.rejected, (state) => {
                state.isLoad = false;
            })
            .addCase(updateTaskStatus.fulfilled, (state, action) => {
                const { taskId, previousStatus, newStatus } = action.meta.arg;
                const task = state.tasks[previousStatus].find((task) => task.objectId === taskId);
                if (task) {
                    state.tasks[previousStatus] = state.tasks[previousStatus].filter((task) => task.objectId !== taskId);
                    state.tasks[newStatus].push(task);
                }
            });
    },
});

export const { addTask, removeTask, updateTask } = taskSlice.actions;
export default taskSlice.reducer;
