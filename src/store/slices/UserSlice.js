import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
// import * as authApi from '../../utils/Auth'

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
//       const newUser = await authApi.register(email, password);
//       dispatch(setUser(newUser))
//       if (newUser) {
//         console.log('COOL')
//       }
    } catch (error) {
//       console.log(error)
//       return rejectWithValue((error.message))
    }

  });
// export const authorizeUser = createAsyncThunk(
//   'user/authorizeUser',
//   async (authData, { rejectWithValue, dispatch}) => {
//     const { email, password } = authData;
//     try {
//       const userData = await authApi.authorize(authData);
//       if (userData.accessToken) {
//         console.log('TOKEN IS HERE BITCH')
//         localStorage.setItem('jwt', userData.accessToken)
//       }


//       dispatch(setUser(userData))
//       // console.log(userData)
//     } catch (error) {
//       return rejectWithValue((error.message))
//     }
//   }
// )

const initialState = {
  email: null,
  // accessToken: getToken(),
  // refreshToken: null,
  id: null,
  isActivated: false,
}
export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {

    },
    removeUser(state) {

    }
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
  }
})

export const { setUser, removeUser  } = userSlice.actions;
export default userSlice.reducer;
