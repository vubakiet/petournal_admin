import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: "",
  fullName: "",
  firstName: "",
  lastName: "",
  email: "",
  avatar: "",
  accessToken: "",
};

const UserSlice = createSlice({
  name: "User",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state = { ...action.payload };
    },

    setUserLogin: (state, action) => {
      if (action.payload) {
        const user = action.payload;
        state.id = user._id;
        state.firstName = user.firstName;
        state.lastName = user.lastName;
        state.fullName = user.lastName + " " + user.firstName;
        state.email = user.email;
        state.avatar = user.avatar;
      }
    },
    setAvatar: (state, action) => {
      if (action.payload) {
        state.avatar = action.payload;
      }
    },

    updateUserState: (state, action) => {
      const { lastName, firstName, email } = action.payload;
      if (lastName) {
        state.lastName = lastName;
        if (!firstName) {
          state.fullName = lastName + " " + state.firstName;
        }
      }
      if (firstName) {
        state.firstName = firstName;
        if (!lastName) {
          state.fullName = state.lastName + " " + firstName;
        }
      }
      if (lastName && firstName) {
        state.fullName = lastName + " " + firstName;
      }
      if (email) {
        state.email = email;
      }
    },
    setToken: (state, action) => {
      state.accessToken = action.payload;
    },

    resetUserState: () => initialState,
  },
});

export const {
  setUserLogin,
  resetUserState,
  setToken,
  updateUserState,
  setAvatar,
} = UserSlice.actions;

export default UserSlice.reducer;
