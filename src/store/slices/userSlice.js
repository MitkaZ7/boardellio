import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import authApi from '../../utils/authApi'
import api from '../../utils/api'
import { app } from '../../utils/firebase';
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
    const { email } = regData;
    const { name, avatar, role } = initialState.user;
    try {
      dispatch(showLoader()); // Показываем индикатор загрузки
      const res = await authApi.register(regData);
      await api.createUserInDB(res.data.localId, { email, name, avatar, role });
      dispatch(hideLoader()); // Прячем индикатор загрузки
    } catch (error) {
      handleErrors(error, dispatch); // Обработка ошибок
      return rejectWithValue(error.message);
    }
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

// export const authorizeUser2 = createAsyncThunk(
//   'user/authorizeUser',
//   async (authData, { rejectWithValue, dispatch }) => {
//     try {
//       dispatch(showLoader());

//       const user = await authApi.authorize({ ...authData, returnSecureToken: true });
//       const token = user.data.idToken;
//       localStorage.setItem('authToken', token);
//       const userData = await getUserDataFromToken(token)
//       // const userData = {
//       //   email: user.data.email,
//       //   ...await dispatch(getUserData(user.data.localId)).unwrap(),
//       // };



//       dispatch(setUser(userData));
//       dispatch(setAuthorizationStatus(true));
//       dispatch(hideLoader());
//     } catch (error) {
//       handleErrors(error, dispatch);
//       return rejectWithValue(error.message);
//     }
//   }
// );


export const authorizeUser = createAsyncThunk(
  'user/authorizeUser',
  async (authData, { rejectWithValue, dispatch }) => {
    try {
      dispatch(showLoader()); 
     
      const user = await authApi.authorize({...authData, returnSecureToken: true});
      const userData = {
        email: user.data.email,
        ...await dispatch(getUserData(user.data.localId)).unwrap(),
      };

      localStorage.setItem('authToken', user.data.idToken);
      localStorage.setItem('userData', JSON.stringify(userData));

      dispatch(setUser(userData));
      dispatch(setAuthorizationStatus(true));

      dispatch(hideLoader()); 
    } catch (error) {
      handleErrors(error, dispatch); 
      return rejectWithValue(error.message);
    }
  }
);
const userDataFromLocalStorage = localStorage.getItem('userData');
// if (userDataFromLocalStorage) {
//     initialState = JSON.parse(userDataFromLocalStorage);
// }
// (userDataFromLocalStorage) ? JSON.parse(userDataFromLocalStorage) : 
const initialState = {
  user: JSON.parse(localStorage.getItem('userData')) || {
    email: '',
    name: 'Vincent Vega',
    role: 'user',
    avatar: 'https://dummyimage.com/150/b8b8b8/fff',
  },
  isAuthorized: !!localStorage.getItem('authToken'),
  error: null,
};

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
