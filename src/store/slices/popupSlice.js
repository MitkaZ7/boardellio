import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isOpen: false,
    popups: [],
    taskPopupIsOpen: false,
    openedTaskId: null,
    addTaskPopupIsOpen: false,
    activePopup: null,
    addProjectPopup: {
        isOpen: false,
        data: null,
    }
}
const popupSlice = createSlice({
    name: 'popup',
    initialState,
    reducers: {
        openPopup: (state, action) => {
            state.popups.push(action.payload);
            state.isOpen = true;
            state.activePopup = action.payload.name; // Установите значение activePopup на соответствующий попап
        },
        closePopup: (state,action) => {
            state.isOpen = false;
            // state.popups = []
        },
        openTaskPopup: (state,action) => {
            console.log(action.payload)
            state.taskPopupIsOpen = true;
            state.openedTaskId = action.payload;
        },
        closeTaskPopup: (state, action) => {
            state.taskPopupIsOpen = false;
            state.openedTaskId = null; 
        },
        openAddProjectPopup(state) {
            state.addProjectPopup.isOpen = true;
        },
        closeAddProjectPopup(state) {
            state.addProjectPopup.isOpen = false;
        },
        setAddProjectPopupData(state, action) {
            state.addProjectPopup.data = action.payload;
        },
    },
  
});

export const { openPopup, closePopup, openTaskPopup, closeTaskPopup, openAddProjectPopup, closeAddProjectPopup, setAddProjectPopupData } = popupSlice.actions;
export default popupSlice.reducer;