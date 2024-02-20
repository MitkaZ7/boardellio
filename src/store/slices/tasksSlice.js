import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../../utils/api';
import { hideLoader, showLoader } from './loaderSlice';
import { incrementProjectTaskQty } from './projectSlice';

const getInitialSelectedTask = () => {
    showLoader();
    const storedSelectedTask = localStorage.getItem('selectedTask');
    if (storedSelectedTask) {
        return JSON.parse(storedSelectedTask);
    }
    hideLoader();
    return { taskData: null };
};

const initialState = {
    isLoad: false,
    selectedTaskId: null,
    selectedTaskData: getInitialSelectedTask(),
    tasks: {
        queue: [],
        dev: [],
        done: [],
        deleted: [],
    },
    tasksVisibility: {
        isQueueVisible: true,
        isDevVisible: true,
        idDoneVisible: true,
    },
    nextTaskNumber: null,
};

export const getOneTask = createAsyncThunk(
    'tasks/getOneTask',
    async (taskId, { rejectWithValue, dispatch }) => {
        dispatch(showLoader());
        try {
            const task = await api.getTaskById(taskId);
            dispatch(hideLoader());
            return task;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const getTasks = createAsyncThunk(
    'tasks/getTasksList',
    async (_, { rejectWithValue, dispatch, getState }) => {
        dispatch(showLoader());
        try {
            const currentProjectId = getState().projects.selectedProject.projectId;
            const tasksList = await api.getProjectTasks(currentProjectId);
            console.log(tasksList)
            dispatch(hideLoader());
            const categorizedTasks = categorizeTasks(tasksList);
            // const serializedTasks = serializeTasks(categorizedTasks);
            console.log(categorizedTasks)
            return categorizedTasks;
            
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const createTask = createAsyncThunk(
    'tasks/createTask',
    async (data, { rejectWithValue, dispatch, getState }) => {
        try {
            const lastTaskNumber = getState().projects.selectedProject.projectTaskQty;
            console.log(lastTaskNumber)
            // const nextTaslNumber = dispatch(incrementProjectTaskQty())
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
            console.log(`Task with ID ${taskId} deleted forever.`);
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const logicDeleteTask = createAsyncThunk(
    'tasks/logicDeleteTask',
    async(taskId, { rejectWithValue, dispatch }) => {
        try {
            await api.logicDeleteTask(taskId);
            console.log(`Task with ID ${taskId} logicaly deleted.`);
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const updateTaskStatus = createAsyncThunk(
    'tasks/updateTaskStatus',
    async ({ taskId, newStatus }, { rejectWithValue, dispatch }) => {
        try {
            await api.updateTask(taskId, { status: newStatus });
            console.log(`Task with ID ${taskId} status changed to ${newStatus}.`);
            await dispatch(getTasks());
            return { taskId, newStatus };
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
        switch (task.status.stringValue) {
            case 'queue':
                categorizedTasks.queue.push({ ...task, taskId: task.id });
                break;
            case 'dev':
                categorizedTasks.dev.push({ ...task, taskId: task.id });
                break;
            case 'done':
                categorizedTasks.done.push({ ...task, taskId: task.id });
                break;
            default:
                break;
        }
    });
    return categorizedTasks;
};

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

        selectTask(state, action) {
            state.selectedTaskId = action.payload;
            localStorage.setItem('selectedTaskId', JSON.stringify(action.payload));
        },
        resetSelectedTaskData: (state) => {
            state.selectedTaskData = getInitialSelectedTask(); 
        },
        toggleQueueVisibility(state) {
            state.tasksVisibility.isQueueVisible = !state.tasksVisibility.isQueueVisible;
        },
        toggleDevVisibility(state) {
            state.tasksVisibility.isDevVisible = !state.tasksVisibility.isDevVisible;
        },
        toggleDoneVisibility(state) {
            state.tasksVisibility.isDoneVisible = !state.tasksVisibility.isDoneVisible;
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
                const { taskId, newStatus } = action.payload;

                state.tasks = {
                    ...state.tasks,
                    [newStatus]: state.tasks[newStatus].map((task) =>
                        task.objectId === taskId ? { ...task, status: newStatus } : task
                    ),
                };
            })
            .addCase(getOneTask.fulfilled, (state, action) => {
                state.selectedTaskData = action.payload;
            });
    },
});

export const { 
    addTask, 
    removeTask, 
    updateTask, 
    selectTask, 
    resetSelectedTaskData,
    toggleQueueVisibility,
    toggleDevVisibility,
    toggleDoneVisibility 
} = taskSlice.actions;
export default taskSlice.reducer;
