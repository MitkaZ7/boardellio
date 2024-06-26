import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../../utils/api';
import { hideLoader, showLoader } from './loaderSlice';
import { increaseTaskQty } from './projectSlice';

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
    selectedTaskData: null,
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
        try {
            const task = await api.getTaskById(taskId);
            // console.log(task)
            return task
        } catch (error) {
            console.log(error)
            return rejectWithValue(error.message);
        }
       
    }
);

export const getTasks = createAsyncThunk(
    'tasks/getTasksList',
    async (_, { rejectWithValue, dispatch, getState }) => {
        dispatch(showLoader());
        try {
            const currentProjectId = getState().projects.selectedProject.id;
            const tasksList = await api.getProjectTasks(currentProjectId);
            if (tasksList) {
                const categorizedTasks = await categorizeTasks(tasksList);
                dispatch(hideLoader());
                return categorizedTasks;
            } else {
                dispatch(hideLoader());
                return
            } 
        } catch (error) {
            dispatch(hideLoader());
            return rejectWithValue(error.message);
        }
    }
);

export const getUserTasks = createAsyncThunk(
    'tasks/getTasksList',
    async (userEmail, { rejectWithValue, dispatch }) => {
        // dispatch(showLoader());
        try {

            const tasksList = await api.getUserTasks(userEmail);
            if (tasksList && tasksList.length > 0) {
                dispatch(hideLoader());
                console.log(tasksList)
                return tasksList;
            } else {
                dispatch(hideLoader());
                return []; 
            }
        } catch (error) {
            dispatch(hideLoader());
            return rejectWithValue(error.message);
        }
    }
);






export const createTask = createAsyncThunk(
    'tasks/createTask',
    async (data, { rejectWithValue, dispatch, getState }) => {
        try {
            console.log(data)
            await api.createTask(data);
            await dispatch(increaseTaskQty({ projectId: data.projectId, newQty: data.number }))
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

const toggleTaskCompletion = (status) => {
    if (status === 'done') {
       return true 
    } else  return false 
}

export const updateTaskStatus = createAsyncThunk(
    'tasks/updateTaskStatus',
    async ({ id, newStatus }, { rejectWithValue, dispatch }) => {
        
        try {   
            const newData = {
                status: newStatus,
                isCompleted: toggleTaskCompletion(newStatus)
            }
            await api.updateTask(id, newData);
            // console.log(`Task with ID ${id} status changed to ${newStatus}.`);
            await dispatch(getTasks());
            return { id, newStatus };
        } catch (error) {
            return rejectWithValue(error.message);
        }
    } 
    
);

export const updateTask = createAsyncThunk(
    'tasks/updateTask',
    async ({ taskId, newData }, { rejectWithValue, dispatch }) => {
        try {
            await api.updateTask(taskId, newData);
            await dispatch(getTasks());
            return { taskId, newData };
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
        findTaskById(state, action) {
            const { taskId } = action.payload;
            for (const key in state.tasks) {
                if (Object.hasOwnProperty.call(state.tasks, key)) {
                    const taskArray = state.tasks[key];
                    const foundTask = taskArray.find(task => task.id === taskId);
                    if (foundTask) {
                        state.selectedTaskData = foundTask;
                      
                        return;
                    }
                }
            }
          
            state.selectedTaskData = null;
        },  
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
        completeTask(state, action) {
            
        },
        resetTasksState(state) {
            state.tasks = initialState.tasks;
        },
        selectTask(state, action) {
            state.selectedTaskId = action.payload;
            localStorage.setItem('selectedTaskId', JSON.stringify(action.payload));
        },

        resetSelectedTaskData: (state) => {
            state.selectedTaskData = null; 
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
            .addCase(getOneTask.pending, (state) => {
                state.isLoad = true;
            })
            .addCase(getTasks.fulfilled, (state, action) => {
                state.tasks = action.payload;
                state.isLoad = false;
            })
            .addCase(getTasks.rejected, (state) => {
                state.tasks = {
                    queue: [],
                        dev: [],
                            done: [],
                                deleted: [],
    },
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
    selectTask,
    findTaskById,
    resetTasksState, 
    resetSelectedTaskData,
    toggleQueueVisibility,
    toggleDevVisibility,
    toggleDoneVisibility 
} = taskSlice.actions;
export default taskSlice.reducer;
