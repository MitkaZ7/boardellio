import { createSlice } from "@reduxjs/toolkit";

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
            state.popupData = action.payload.data; // Данные для попапа
        },
        closePopup: (state, action) => {
            state.isOpen = false;
            state.activePopup = ''; // Сбрасывает имя активного попапа
            state.popupData = null; // Сбрасывает данные попапа
        },
        openTaskPopup: (state, action) => {
            state.isOpen = true;
            state.activePopup = action.payload.name;
            state.openedTaskId = action.payload; // Установите openedTaskId в переданный taskId
        },

        closeTaskPopup: (state, action) => {
            state.taskPopupIsOpen = false;
            state.openedTaskId = null; 
        },
        // openAddProjectPopup(state) {
        //     state.addProjectPopup.isOpen = true;
        // },
        // closeAddProjectPopup(state) {
        //     state.addProjectPopup.isOpen = false;
        // },
        // setAddProjectPopupData(state, action) {
        //     state.addProjectPopup.data = action.payload;
        // },
    },
  
});

export const { openPopup, closePopup, openTaskPopup, closeTaskPopup } = popupSlice.actions;
export default popupSlice.reducer;