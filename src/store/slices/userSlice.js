import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import authApi from '../../utils/authApi'
import api from '../../utils/api'
import { app } from '../../utils/firebase';
import { generateRandomName } from '../../utils/generateUserName';
import { defaultProfilePhoto } from '../../utils/constants';
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
    regData.photoUrl = defaultProfilePhoto;
    regData.displayName = generateRandomName();
    dispatch(showLoader());
    try {
      const res = await authApi.register(regData);
      console.log(res.data);
      dispatch(hideLoader());
    } catch (error) {
      console.log(error.message);
      return rejectWithValue((error.message))
    }
  });

export const authorizeUser = createAsyncThunk(
  "user/authorizeUser",
  async (authData, { dispatch }) => {
    try {
      const res = await authApi.authorize(authData);
      const { refreshToken, idToken, ...userData } = res.data;
      const tokens = {
        accessToken: res.data.idToken,
        refreshToken: res.data.refreshToken,
      }
      console.log(userData)
      if (refreshToken) {
        dispatch(setUser(userData));
        dispatch(setAuthorizationStatus(true));
      }
      // localStorage.setItem("accessToken", idToken);
      // localStorage.setItem("refreshToken", refreshToken);
      localStorage.setItem('jwt', JSON.stringify(tokens));

      
    } catch (error) {
      console.error("Failed to authorize user:", error);
      throw error;
    }
  }
);

// export const authorizeUser = createAsyncThunk(
//   'user/authorizeUser',
//   async (authData, { rejectWithValue, dispatch }) => {
   
//     try {
//       const res = await authApi.authorize(authData);
      // const userData = {
      //   email: res.data.email,
      //   name: res.data.displayName,
      //   photoUrl: res.data.photoUrl || defaultProfilePhoto,
      //   localId: res.data.localId,
      //   refreshToken: res.data.refreshToken,
      // }

//       await dispatch(setUser(userData));
//       await dispatch(setAuthorizationStatus(true));
//       console.log(userData);
//       localStorage.setItem('refreshToken', JSON.stringify(userData.refreshToken));
//     } catch (error) {
      
//     }
//   }
// );


export const refrehUserToken = createAsyncThunk(
  "user/refreshUserData",
  async (refreshToken, { rejectWithValue, dispatch }) => {
    try {
      const response = await authApi.refreshToken(refreshToken);
      const data = response.data.userData;
      console.log(data);
      // dispatch(setUser(data));
      dispatch(setAuthorizationStatus(true));
    } catch (error) {
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


const initialState = {
  user: {
    email: "",
    name: "",
    role: "user",
    photoUrl: "",
    localId: null,
    
  },
  isAuthorized: false,
  refreshToken: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    
      // Object.keys(action.payload).forEach((key) => {
      //   if (key in state.user) {
      //     state.user[key] = action.payload[key];
      //   }
      // });
    },
    setAuthorizationStatus(state, action) {
      const refreshToken = localStorage.getItem("refreshToken");
      state.isAuthorized = Boolean(refreshToken);
    },
    // setAuthorizationStatus(state, action) {
    //   state.isAuthorized = action.payload;
    // },
    setUserName(state, action) {
      state.user.name = action.payload;
    },
    setUserAvatar(state, action) {
      state.user.avatar = action.payload;
    },
    logoutUser(state) {
        localStorage.removeItem('refreshToken');
        state.isAuthorized = false;
        state.user = {};
    },
    setError(state, action) {
      state.error = action.payload;
    },
    resetError(state, action) {
      state.error = null
    },
    saveRefrehToken(state, action) {

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
      // .addCase(refrehUserToken.pending, (state, action) => {
      //   state.isLoading = true;
      // })
      .addCase(refrehUserToken.fulfilled, (state, action) => {
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
          // state.error = null;
        }
      );
  } 
})

export const { 
  setUser,
  setUserName,
  setUserAvatar, 
  logoutUser, 
  setError, 
  resetError, 
  setAuthorizationStatus  
} = userSlice.actions;
export default userSlice.reducer;
