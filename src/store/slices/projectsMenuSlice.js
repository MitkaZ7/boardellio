import { createSlice } from "@reduxjs/toolkit";
const projectsMenuSlice = createSlice({
    name: 'projectsMenu',
    initialState: {
        isOpen: false,
        projects: [],
        searchResult: [],
    },
    reducers: {
        openProjectsMenu: (state, action) => {
            state.isOpen = true;
        },
        closeProjectsMenu: (state,action) => {
            state.isOpen = false;
        },
        setProjetcs: (state,action) => {
            state.project = action.payload;
        },
        setSearchResult: (state, action) => {
            state.searchResult = action.payload;
        }
    }
})
export const { openProjectsMenu, closeProjectsMenu, setProjetcs, setSearchResult } = projectsMenuSlice.actions;
export default projectsMenuSlice.reducer;