import { createSlice } from '@reduxjs/toolkit'
const getTheme = () => {
  const userMedia = window.matchMedia('(prefers-color-scheme: dark');
  if (userMedia.matches) return 'dark';
  const theme = `${window?.localStorage?.getItem('theme')}`;
  if (['light', 'dark'].includes(theme)) return theme;
  return 'light'; 
  
}

const initialState = getTheme()

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme: (state, action) => {
      localStorage.setItem('theme', action.payload); 
      return action.payload;
    },
  },
})
export const { setTheme } = themeSlice.actions;
export default themeSlice.reducer;
