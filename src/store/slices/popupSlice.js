import { createSlice } from "@reduxjs/toolkit";
import { resetSelectedTaskData } from './tasksSlice'
const initialState = {
    isOpen: false,
    popups: [],
    openedPopups: {},
    openedTaskId: null,
  
}



const popupSlice = createSlice({
    name: 'popup',
    initialState,
    reducers: {
        openPopup: (state, action) => {
            const { name } = action.payload;
            state.openedPopups[name] = { isOpen: true };
        },
        closePopup: (state, action) => {
            const { name } = action.payload;
            delete state.openedPopups[name]; 
        },
    },
  
});

export const { openPopup, closePopup } = popupSlice.actions;
export default popupSlice.reducer;