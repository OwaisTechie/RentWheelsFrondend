import { createSlice } from '@reduxjs/toolkit'

export const AuthSlice = createSlice({
  name: 'AuthSlice',
  initialState: {
    users: {
      isLoading: true,
      user: null,
      userToken: null,
    },
    userMode:'P',
    Loader: false,
  },
  reducers: {
    login: (state,action) => {
        state.users=action.payload;
    },
    logout: (state) => {
      console.log("LOG State");
      state.users.user = null;
      state.users.isLoading= false;
      state.users.userToken= null;
      state.userMode='P'
    },
    register: (state) => {
      state.users.user = null;
      state.users.isLoading= false;
      state.users.userToken= null;
    },
    retrieveToken: (state,action) => {
      console.log("action.payload ->> ",action.payload)
      state.users.userToken=action.payload.userToken;
      state.users.isLoading=false;
    },
    modeChange: (state,action) => {
      console.log("MODE CHANGE =>> ",action.payload)
      state.userMode=action.payload.user;
      isLoading=false;
    },
    globalLoader: (state,action) => {
      console.log("action.payload load =>> ",action.payload)
      state.Loader= action.payload;
    }
  }
})

// Action creators are generated for each case reducer function
export const { login, logout, register,retrieveToken,modeChange ,globalLoader} = AuthSlice.actions

export default AuthSlice.reducer

// export const loginReducer = (prevState, action) => {
//   switch (action.type) {
//     case 'RETRIEVE_TOKEN':
//       return {
//         ...prevState,
//         user:action.users,
//         userToken: action.users.userToken,
//         isLoading: false,
//       };
//     case 'LOGIN':
//       return {
//         ...prevState,
//         user: action.users,
//         userToken: action.users.userToken,
//         isLoading: false,
//       };
//     case 'LOGOUT':
//       return {
//         ...prevState,
//         user: null,
//         userToken: null,
//         isLoading: false,
//       };
//     case 'REGISTER':
//       return {
//         ...prevState,
//         user: null,
//         userToken: null,
//         isLoading: false,
//       };
//   }
// };
// export default {loginReducer,initialLoginState};
