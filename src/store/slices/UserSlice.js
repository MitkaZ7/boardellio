import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import authApi from '../../utils/authApi'
import { app } from '../../utils/firebase';
import { hideLoader, showLoader } from './loaderSlice';

// const getToken = () => {
//   const token = localStorage.getItem('jwt');
//   if (token) {
//     authApi.checkToken(token)
//   }
// }
export const createUser = createAsyncThunk(
  'user/createUser',
  async (regData, { rejectWithValue, dispatch}) => {
    const { email, password } = regData;
    try {
      const res = await authApi.register(regData);
      console.log('User created successfully');
      console.log(res.data)
    } catch (error) {
      console.log(error.message)
      dispatch(setError(error.message))
      return rejectWithValue((error.message))
    }

  });
export const authorizeUser = createAsyncThunk(
  'user/authorizeUser',
  async (authData, { rejectWithValue, dispatch }) => {
    const { email, password } = authData;
    try {
      const res = await authApi.authorize(authData);
      console.log('User authorized successfully');
      dispatch(setUser(res.data));
      console.log(res.data);
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        // Обработка ошибки от сервера
        const errorMessage = error.response.data.error.message;
        console.log('Firebase error message:', errorMessage);
        dispatch(setError(errorMessage));
      } else if (error.message) {
        // Обработка других ошибок
        console.log('Error message:', error.message);
        dispatch(setError(error.message));
      } else {
        // Обработка других случаев
        console.log('Unexpected error:', error);
        dispatch(setError('Unexpected error occurred'));
      }
      return rejectWithValue(error.message);
    }
  }
);



const initialState = {
  email: null,
  accessToken: null,
  idToken: null,
  refreshToken: null,
  userId: null,
  registered: false,
  error: null,
}
export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      const {email, idToken, localId} = action.payload;
      state.email = email;
      state.idToken = idToken;
      localStorage.setItem('idToken', idToken);
      state.userId = localId;
      // state.registered = true;
    },
    removeUser(state) {

    },
    setError(state, action) {
      state.error = action.payload;
      console.log(action.payload)
    },
    // setUser(state, action){
    //   const userData = action.payload;
    //   state.email = userData.user.email;
    //   state.id = userData.user.id;
    //   state.isActivated = userData.user.isActivated;
    //   state.accessToken = userData.accessToken;
    //   state.refreshToken = userData.refreshToken;

    // },
    // removeUser(state){
    //   state.email = null;
    //   state.accessToken = null;
    //   state.refreshToken = null;
    //   state.name = null;
    //   state.id = null;
    //   state.isActivated = false;
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createUser.rejected, (state,action) => {
        state.error = action.payload;
        console.log(action.payload)
      })
      .addCase(authorizeUser.rejected, (state, action) => {
        state.error = action.payload;
        console.log(action.payload)
      })
      .addMatcher(
        (action) => action.type.endsWith('/fulfilled'),
        (state, action) => {
          state.error = null;
          // state[action.meta.requestId] = 'fulfilled';
        }
      );
  } 
})

export const { setUser, removeUser, setError  } = userSlice.actions;
export default userSlice.reducer;
