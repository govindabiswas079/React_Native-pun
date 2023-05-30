import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  RegisterData: {},
  authLoading: true,
  UsersId: {},
  userAuth: false,
  logOutModal: false
};

const reducerSlicer = createSlice({
  name: 'reducerSlicer',
  initialState,
  reducers: {
    setRegisterData: (state, action) => {
      state.RegisterData = action?.payload
    },
    setAuthLoader: (state, action) => {
      state.authLoading = action?.payload
    },
    setUsersId: (state, action) => {
      state.UsersId = action?.payload
    },
    setUserAuth: (state, action) => {
      state.userAuth = action?.payload
    },
    setLogOutModal: (state, action) => {
      state.logOutModal = action?.payload
    },
    setResetAllSates: (state, action) => {
      state.RegisterData = action?.payload
      state.authLoading = action?.payload
      state.UsersId = action?.payload
      state.userAuth = action?.payload
      state.logOutModal = action?.payload
    },
  },

});

export const {
  setRegisterData,
  setAuthLoader,
  setUsersId,
  setUserAuth,
  setLogOutModal,
  setResetAllSates,
} = reducerSlicer.actions;
export default reducerSlicer.reducer;
