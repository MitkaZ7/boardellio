import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    isMenuOpen: false,
}
const sideMenuSlice = createSlice({
    name: 'sideMenu',
    initialState,
    reducers: {
        openMenu: (state, action) => {
            state.isMenuOpen = true;
        },
        closeMenu: (state, action) => {
            state.isMenuOpen = false;
        },
    }
});

export const { openMenu, closeMenu } = sideMenuSlice.actions;
export default sideMenuSlice.reducer;