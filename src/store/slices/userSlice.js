import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import authApi from '../../utils/authApi'
import api from '../../utils/api'
import { app } from '../../utils/firebase';
import { generateRandomName } from '../../utils/generateUserName';
import { hideLoader, showLoader } from './loaderSlice';


const handleErrors = (error, dispatch) => {
  if (error.response && error.response.data && error.response.data.error) {
    const errorMessage = error.response.data.error.message;
    console.log('Firebase error message:', errorMessage);
    dispatch(setError(errorMessage));
  } else if (error.message) {
    console.log('Error message:', error.message);
    dispatch(setError(error.message));
  } else {
    dispatch(setError('Unexpected error occurred'));
  }
}


export const createUser = createAsyncThunk(
  'user/createUser',
  async (regData, { rejectWithValue, dispatch }) => {

    // console.log('regData: ', { ...regData, displayName: generateRandomName()});
    const res = await authApi.register({ ...regData, displayName: generateRandomName() });
    console.log(res)
    // const { email, password } = regData;
    // const { name, avatar, role } = initialState.user;
    // try {
    //   dispatch(showLoader()); // Показываем индикатор загрузки
    //   const res = await authApi.register(regData);
    //   await api.createUserInDB(res.data.localId, { email, name, avatar, role });
    //   dispatch(hideLoader()); // Прячем индикатор загрузки
    // } catch (error) {
    //   console.log(error.message)
    //   dispatch(setError(error.message))
    //   return rejectWithValue((error.message))
    // }

  });

export const authorizeUser = createAsyncThunk(
  'user/authorizeUser',
  async (authData, { rejectWithValue, dispatch }) => {
    console.log('authData at slice: ', authData);
    // const { email, password } = authData;
    // try {

    //   const user = await authApi.authorize({ ...authData, returnSecureToken: true });
    //   const userData = {
    //     email: user.data.email,
    //     ...await dispatch(getUserData(user.data.localId)).unwrap(),
    //   };



    //   dispatch(setAuthorizationStatus(true));

    //   await dispatch(setUser(userData));
    //   console.log('data after SetUser: ', userData);
    // } catch (error) {
    //   if (error.response && error.response.data && error.response.data.error) {
    //     // Обработка ошибки от сервера
    //     const errorMessage = error.response.data.error.message;
    //     console.log('Firebase error message:', errorMessage);
    //     dispatch(setError(errorMessage));
    //   } else if (error.message) {
    //     // Обработка других ошибок
    //     console.log('Error message:', error.message);
    //     dispatch(setError(error.message));

    //   } else {
    //     // Обработка других случаев
    //     console.log('Unexpected error:', error);
    //     dispatch(setError('Unexpected error occurred'));
    //   }
    //   return rejectWithValue(error.message);
    // }
  }
);



const getUserData = createAsyncThunk(
  'user/getUserData',
  async (userId, {rejectWithValue,dispatch}) => {
    try {
      const userData = await api.getUserData(userId);
      return userData;
    } catch (error) {
      
    }
  }

); 
// export const updateTask = createAsyncThunk(
//   'tasks/updateTask',
//   async ({ taskId, newData }, { rejectWithValue, dispatch }) => {
//     try {
//       await api.updateTask(taskId, newData);
//       await dispatch(getTasks());
//       return { taskId, newData };
//     } catch (error) {
//       return rejectWithValue(error.message);
//     }
//   }
// );


export const updateUser = createAsyncThunk(
  'user/updateUser',
  async ({ userId, newData }, { rejectWithValue, dispatch }) => {
    try {
      await api.updateUserData(userId, newData);
      // После успешного обновления данных в БД, получите актуальные данные пользователя
      const updatedUserData = await api.getUserData(userId);
      dispatch(setUser(updatedUserData))
      return updatedUserData;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);





const userDataFromLocalStorage = localStorage.getItem('userData');
// if (userDataFromLocalStorage) {
//     initialState = JSON.parse(userDataFromLocalStorage);
// }
// const initialState = (userDataFromLocalStorage) ? JSON.parse(userDataFromLocalStorage) : {
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
const initialState = {
  user: {
    email: 'noemail@noemail.ru',
    name: '',
    role: 'user',
    photoUrl: 'https://dummyimage.com/150/b8b8b8/fff',
  },
  
  
  refreshToken: null,
  
  isAuthorized: false,
  error: null,

}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      Object.keys(action.payload).forEach((key) => {
        if (key in state.user) {
          state.user[key] = action.payload[key];
        }
      });
    },
    setAuthorizationStatus(state, action) {
      state.isAuthorized = action.payload;
    },
    setUserName(state, action) {
      state.user.name.stringValue = action.payload;
    },
    setUserAvatar(state, action) {
      state.user.avatar.stringValue = action.payload;
    },
    removeUser(state) {
        localStorage.removeItem('userData');
      
        state.isAuthorized = false;
        state.user = {};
    },
    setError(state, action) {
      state.error = action.payload;
    },
    resetError(state, action) {
      state.error = null
    }
  },
  extraReducers: (builder) => {
    builder
      // .addCase(createUser.fulfilled, (state, action) => {
      //   state.isAuthorized = true; 
      // })
      .addCase(authorizeUser.fulfilled, (state, action) => {
        state.isAuthorized = true; 
        
      })
      .addCase(getUserData.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(createUser.rejected, (state,action) => {
        state.error = action.payload;
      })
      .addCase(authorizeUser.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addMatcher(
        (action) => action.type.endsWith('/fulfilled'),
        (state, action) => {
          state.error = null;
        }
      );
  } 
})

export const { 
  setUser,
  setUserName,
  setUserAvatar, 
  removeUser, 
  setError, 
  resetError, 
  setAuthorizationStatus  
} = userSlice.actions;
export default userSlice.reducer;
