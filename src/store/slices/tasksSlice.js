import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import Parse from 'parse/dist/parse.min.js';
import api from '../../utils/api'
import { hideLoader, showLoader } from './loaderSlice';
const initialState = {
    tasks: [],
    isLoad: false,

}
function isPendingAction(action) {
    return action.type.endsWith('/pending')
}
export const getTasks = createAsyncThunk(
    'tasks/getTasksList',
    async (_, { rejectWithValue, dispatch }) => {
        dispatch(showLoader())
        try {
            const tasksList = await api.getTasks();
            console.log(tasksList)
            dispatch(hideLoader())
            return tasksList;
        } catch (error) {
            return rejectWithValue((error.message))
        }
    }
)



export const createTask = createAsyncThunk(
    'tasks/createTask',
    async (data, {rejectWithValue,dispatch}) => {
        try {
            const res = await api.createTask(data);
            console.log(res);
            // dispatch(addTask(res))
        } catch (error) {
            return rejectWithValue((error.message))
        }

        // try {
        //     const Task = new Parse.Object('Task');
        //     Task.set('title',data.title);
        //     Task.set('isCompleted', data.isCompleted);
        //     Task.set('status', 'queue');
        //     Task.set('priority', data.priority)
        //     Task.set('description', data.description)
        //     await Task.save();
        //     console.log('success');
        //     return true;
        // } catch (error) {
        //     return rejectWithValue((error.message))
        // }
    }
)

export const taskSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        addTask(state,action) {
            console.log(action.payload)
            state.tasks.tasks.push(action.payload)
        },
        removeTask(state, action) {

        },
        updateTask(state, action) {

        }
    },
    extraReducers: (builder) => {
        builder
            .addMatcher(isPendingAction, (state, action) =>{
                state[action.meta.requestId] = 'pending'
            })
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
                    state.tasks = action.payload;
                    state[action.meta.requestId] = 'fulfilled'
                    state.isLoad = true;
                }
            )
    }
   
})
export const { addTask, removeTask, updateTask} = taskSlice.actions;
export default taskSlice.reducer;

   
