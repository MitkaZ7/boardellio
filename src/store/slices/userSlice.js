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
      const userData = await authApi.authorize(authData);
      // console.log('User authorized successfully');
      dispatch(setAuthorizationStatus(true));
      await dispatch(setUser(userData.data));
      // console.log(userData.data);
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
const userDataFromLocalStorage = localStorage.getItem('userData');
// if (userDataFromLocalStorage) {
//     initialState = JSON.parse(userDataFromLocalStorage);
// }
const initialState = (userDataFromLocalStorage) ? JSON.parse(userDataFromLocalStorage) : {
  // email: null,
  // name: null,
  user: {
    email: '',
    name: '',
    role: 'user',
    avatar: null,
  },
  // accessToken: null,
  // idToken: null,
  refreshToken: null,
  // userId: null,
  isAuthorized: false,
  error: null,
}

// const initialState = {
//   // email: null,
//   // name: null,
//   user: {
//     email: '',
//     name: '',
//     role: 'user',
//     avatar: null,
//   },
//   // accessToken: null,
//   // idToken: null,
//   refreshToken: null,
//   // userId: null,
//   isAuthorized: false,
//   error: null,
// }
export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      // console.log(action.payload)
      state.user = action.payload;
      // const {email, idToken, localId} = action.payload;
      // state.user.email = email;
      // state.idToken = idToken;
      // localStorage.setItem('idToken', idToken);
      // state.userId = localId;
      
    },
    setAuthorizationStatus(state, action) {
      state.isAuthorized = action.payload;
    },
    removeUser(state) {
        localStorage.removeItem('userData');
      
        state.isAuthorized = false;
        // state.userId = null;
        state.user = {};
    },
    setError(state, action) {
      state.error = action.payload;
      console.log(action.payload)
    },
    resetError(state, action) {
      state.error = null
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createUser.fulfilled, (state, action) => {
        state.isAuthorized = true; 
      })
      .addCase(authorizeUser.fulfilled, (state, action) => {
        state.isAuthorized = true; 
        
      })
      .addCase(createUser.rejected, (state,action) => {
        state.error = action.payload;
        console.log(action.payload)
      })
      .addCase(authorizeUser.rejected, (state, action) => {
        // state.error = action.payload;
        // console.log(action.payload)
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

export const { setUser, removeUser, setError, resetError, setAuthorizationStatus  } = userSlice.actions;
export default userSlice.reducer;
