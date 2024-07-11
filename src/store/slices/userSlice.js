import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import authApi from '../../utils/authApi'
import api from '../../utils/Api'
import { app } from '../../utils/firebase';
import { generateRandomName } from '../../utils/generateUserName';
import { defaultProfilePhoto } from '../../utils/constants';
import { hideLoader, showLoader } from './loaderSlice';
import { getTokens, setTokens, clearTokens } from '../../utils/tokenUtils'

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

export const loginUser = createAsyncThunk(
  'user/loginUser',
  async (authData, { dispatch }) => {
    try {
      const res = await authApi.login(authData);
      // console.log('Login response:', res);
      const { idToken, refreshToken } = res.data;
      const tokens = { idToken, refreshToken };
      await setTokens(tokens);
      await api.setToken(idToken);
      dispatch(setUser(res.data));
      dispatch(setAuthorizationStatus(true));
      // return res.data;
    } catch (error) {
      throw error;
    }
  }
);
const getUserData = createAsyncThunk(
  'user/getUserData',
  async (userId, { rejectWithValue, dispatch }) => {
    try {
      const userData = await api.getUserData(userId);
      console.log(userId)
      return userData;
    } catch (error) {
      console.log(error.message)
    }
  }

);
export const authorizeUser = createAsyncThunk(
  'user/authorizeUser',
  async (accessToken, { dispatch }) => {
    try {
      // await api.setToken(accessToken);
      // console.log('accessToken auth : ', accessToken);
      // // dispatch(setAuthorizationStatus(true));
      // // // const user = await getUserData(accessToken);
      // // // // dispatch(setUser(user))
      // // // console.log(user)

    } catch (error) {
      throw error;
    }
  }
);







export const checkIdToken = createAsyncThunk(
  'user/checkToken',
  async (idToken, { rejectWithValue, dispatch}) => {
 
     try {
       await authApi.checkToken(idToken)
     } catch (error) {
      console.log(error.message)
      dispatch(setAuthorizationStatus(false));
     }
     
  }
);

// export const checkAndRefreshToken = createAsyncThunk(
//   'user/checkAndRefreshToken',
//   async (_, { rejectWithValue }) => {
//     const tokens = JSON.parse(localStorage.getItem('jwt') || '{}');
//     const { idToken, refreshToken } = tokens;

//     if (!idToken) {
//       return rejectWithValue('No ID token found');
//     }

//     try {
//       authApi.checkToken(idToken);
//       return { idToken };
//     } catch (error) {
//       if (refreshToken) {
//         try {
//           const response = await authApi.refreshToken(refreshToken);
//           const newIdToken = response.data.id_token;

//           // Save new tokens in localStorage
//           localStorage.setItem('jwt', JSON.stringify({
//             ...tokens,
//             idToken: newIdToken
//           }));

//           return { idToken: newIdToken };
//         } catch (refreshError) {
//           localStorage.removeItem('jwt');
//           return rejectWithValue('Failed to refresh token');
//         }
//       } else {
//         return rejectWithValue('No refresh token found');
//       }
//     }
//   }
// );


export const refreshUserToken = createAsyncThunk(
  'user/refreshUserToken',
  async (_, { dispatch }) => {
    const tokens = JSON.parse(localStorage.getItem('jwt') || '{}');
    try {
      const res = await authApi.refreshToken(tokens.refreshToken);
      const newIdToken = res.data.id_token;
      const newRefreshToken = res.data.refresh_token;
      const newTokens = { idToken: newIdToken, refreshToken: newRefreshToken };

      // Save new tokens in localStorage
      await setTokens(newTokens);
      api.setToken(newIdToken);

      dispatch(setAuthorizationStatus(true));
      return newTokens;
    } catch (error) {
      clearTokens();
      dispatch(setAuthorizationStatus(false));
      throw error;
    }
  }
);

export const verifyToken = createAsyncThunk(
  'user/veryfyToken',
  async (idToken, { rejectWithValue, dispatch}) => {
    try {
      console.log(idToken)
    } catch (error) {
      
    }
  }

);


// export const updateTask = createAsyncThunk(
//   'tasks/updateTask',
//   async ({ taskId, newData }, { rejectWithValue, dispatch }) => {
//     try {
//       await Api.updateTask(taskId, newData);
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
      await Api.updateUserData(userId, newData);
      // После успешного обновления данных в БД, получите актуальные данные пользователя
      const updatedUserData = await Api.getUserData(userId);
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
  tokens: getTokens() || {},

};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
      localStorage.setItem('token', action.payload);
      Api.setToken(action.payload); // обновление токена в API
    },
    setUser(state, action) {
      state.user = action.payload;
    
      // Object.keys(action.payload).forEach((key) => {
      //   if (key in state.user) {
      //     state.user[key] = action.payload[key];
      //   }
      // });
    },
    setAuthorizationStatus(state, action) {
      // const refreshToken = localStorage.getItem("refreshToken");
      // state.isAuthorized = Boolean(refreshToken);
      state.isAuthorized = action.payload;
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
        clearTokens();
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
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isAuthorized = true; 
        state.error = null;
      })
      // .addCase(checkAndRefreshToken.pending, (state) => {
      //   state.status = 'loading';
      // })
      // .addCase(checkAndRefreshToken.fulfilled, (state, action) => {
      //   state.status = 'succeeded';
      //   state.isAuthorized = true;
      // })
      // .addCase(checkAndRefreshToken.rejected, (state, action) => {
      //   state.status = 'failed';
      //   state.isAuthorized = false;
      //   state.error = action.payload;
      // })
      // .addCase(refreshUserToken.pending, (state, action) => {
      //   state.isLoading = true;
      // })
      // .addCase(refreshUserToken.fulfilled, (state, action) => {
      //   state.isAuthorized = true;
      //   state.error = null;
      // })
      .addCase(refreshUserToken.rejected, (state, action) => {
        state.isAuthorized = false;
        state.error = action.payload;
      })
      .addCase(refreshUserToken.fulfilled, (state, action) => {
        state.isAuthorized = true;
      })
      .addCase(getUserData.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(createUser.rejected, (state,action) => {
        state.error = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
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
