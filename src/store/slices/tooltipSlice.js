import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isShown: false,
    message: "",
    messageType: "Info",
};

const tooltipSlice = createSlice({
    name: "tooltip",
    initialState,
    reducers: {
        showTooltip: (state, action) => {
            state.isShown = true;
            state.message = action.payload.message;
            state.messageType = action.payload.messageType || "Info";
        },
        hideTooltip: (state, action) => {
            state.isShown = false;
            state.message = '';
        },
    },
});

export const { showTooltip, hideTooltip } = tooltipSlice.actions;
export default tooltipSlice.reducer;
