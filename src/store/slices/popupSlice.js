import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isOpen: false,
}
const popupSlice = createSlice({
    name: 'popup',
    initialState,
    reducers: {
        openPopup: (state,action) => {
            state.isOpen = true;
        },
        closePopup: (state,action) => {
            state.isOpen = false;
        },
    }
});

export const {openPopup, closePopup} = popupSlice.actions;
export default popupSlice.reducer;