import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isOpen: false,
    popups: [],
    taskPopupIsOpen: false,
    openedTaskId: null,
    addTaskPopupIsOpen: false,
    activePopup: null,
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
            state.popups = []
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
    },
    // extraReducers: (builder) => {
    //     builder
    //         .addMatcher(
    //             (action) => action.type.endsWith('/fulfilled'),
    //             (state, action) => {
 
    //                 console.log(action.payload)
    //             }
               
    //         )
    // },
});

export const { openPopup, closePopup, openTaskPopup, closeTaskPopup } = popupSlice.actions;
export default popupSlice.reducer;