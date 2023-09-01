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
export const getOneTask = createAsyncThunk(
    'tasks/getOneTask',
    async (taskId, {rejectWithValue, dispatch}) => {
        // dispatch(showLoader());
        try {
            const task = await api.getTaskById(taskId);
            // dispatch(hideLoader());
            console.log(task)
            return task
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
)

export const getTasks = createAsyncThunk(
    'tasks/getTasksList',
    async (_, { rejectWithValue, dispatch, getState }) => {
        dispatch(showLoader());
        try {
            const currentProjectId = getState().projects.selectedProject.projectId;
            const tasksList = await api.getProjectTasks(currentProjectId);
            dispatch(hideLoader());
            const categorizedTasks = categorizeTasks(tasksList);
            const serializedTasks = serializeTasks(categorizedTasks);
            return serializedTasks;
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
    Object.entries(tasksList).map(([taskId, task])=>{
        categorizedTasks[task.status].push({
            ...task,
            taskId,
        })
    })
    
    return categorizedTasks;
};
// сериализация для редакса
const serializeTasks = (categorizedTasks) => {
    const serializedTasks = {
        queue: [],
        dev: [],
        done: [],
    };
    for (const [status, tasks] of Object.entries(categorizedTasks)) {
        serializedTasks[status] = tasks.map((task) => ({
            ...task,
        }));
    }
    return serializedTasks;
};
//
export const createTask = createAsyncThunk(
    'tasks/createTask',
    async (data, { rejectWithValue, dispatch }) => {
        try {
            console.log(data);
            await api.createTask(data);
            console.log('Task created successfully.');
        } catch (error) {
            console.error('Error creating task:', error);
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
