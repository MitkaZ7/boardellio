import { createSlice } from "@reduxjs/toolkit";
import { resetSelectedTaskData } from './tasksSlice'
const initialState = {
    isOpen: false,
    popups: [],
    // taskPopupIsOpen: false,
    openedTaskId: null,
    // addTaskPopupIsOpen: false,
    activePopup: '',
    addProjectPopup: {
        isOpen: false,
        data: null,
    }
}


export const openCustomPopup = (dispatch, name, data = null) => {
    if (name === 'TaskPopup') {
        console.log(name + ' is open ')
    }
    dispatch(openPopup({ name, data }));
};
const popupSlice = createSlice({
    name: 'popup',
    initialState,
    reducers: {
        openPopup: (state, action) => {
            state.popups = [];
            state.isOpen = true;
            state.activePopup = action.payload.name;
            state.popupData = action.payload.data; 
        },
        closePopup: (state, action) => {
            state.isOpen = false;
            state.activePopup = ''; 
            state.popupData = null; 
            
        },
        openTaskPopup: (state, action) => {
            state.isOpen = true;
            state.activePopup = action.payload.name;
            state.openedTaskId = action.payload; 
        },

        closeTaskPopup: (state, action) => {
            state.taskPopupIsOpen = false;
            state.openedTaskId = null; 
        },
    },
  
});

export const { openPopup, closePopup, openTaskPopup, closeTaskPopup } = popupSlice.actions;
export default popupSlice.reducer;