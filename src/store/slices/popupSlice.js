import { createSlice } from "@reduxjs/toolkit";
import { resetSelectedTaskData } from './tasksSlice'
const initialState = {
    isOpen: false,
    popups: [],
    openedPopups: {},
    // taskPopupIsOpen: false,
    openedTaskId: null,
    // addTaskPopupIsOpen: false,
    activePopup: '',
    addProjectPopup: {
        isOpen: false,
    },
    confrimPopup : {
        isOpen: false,
    }
}


export const openCustomPopup = (dispatch, name, data = null) => {
    if (name === 'TaskPopup') {
        // console.log(name + ' is open ')
    }
    dispatch(openPopup({ name, data }));
};
const popupSlice = createSlice({
    name: 'popup',
    initialState,
    reducers: {
        openConfirmPopup: (state,action) => {
            state.confrimPopup.isOpen = true
        },
        closeConfirmPopup: (state, action) => {
            state.confrimPopup.isOpen = false
        },
        openPopup: (state, action) => {
            const { name } = action.payload;
            state.openedPopups[name] = { isOpen: true };
        },
        closePopup: (state, action) => {
            const { name } = action.payload;
            delete state.openedPopups[name]; 
        },
        openPopupOld: (state, action) => {
            state.popups = [];
            state.isOpen = true;
            state.activePopup = action.payload.name;
            state.popupData = action.payload.data; 
        },
        closePopupOld: (state, action) => {
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