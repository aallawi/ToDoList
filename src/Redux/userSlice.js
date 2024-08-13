import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_APP_BASE_URL;
const axiosInstance = axios.create({ baseURL: BASE_URL });

export const registerFun = createAsyncThunk(
  "user/register",
  async (objectData, { rejectWithValue }) => {
    const { userName } = objectData;
    try {
      const { data } = await axiosInstance.get("/user");
      const userExists = data.find((user) => user.userName === userName);

      if (userExists) {
        return rejectWithValue("This User Is Already Registered");
      }

      const response = await axiosInstance.post("/user", objectData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "An error occurred");
    }
  }
);

export const loginFun = createAsyncThunk(
  "user/login",
  async (objectData, { rejectWithValue }) => {
    const { userNameLogin, passwordLogin } = objectData;
    try {
      const response = await axiosInstance.get("/user");
      const users = response.data;
      const user = users.find(
        (user) =>
          user.userName === userNameLogin && user.password === passwordLogin
      );
      if (user) {
        return { ...user };
      } else {
        return rejectWithValue("User not found or Password doesn't match");
      }
    } catch (error) {
      return rejectWithValue("User not found");
    }
  }
);

const initialState = {
  userData: null,

  thrRegister: {
    loading: false,
    success: false,
    error: false,
    errMessage: "",
  },

  theLogin: {
    loading: false,
    success: false,
    error: false,
    errMessage: "",
  },
};

const userSlice = createSlice({
  name: "user",
  initialState,

  reducers: {
    logoutUser: (state) => {
      state.userData = null;
    },
    resetUserState: (state) => {
      Object.assign(state, initialState);
    },
  },

  extraReducers: (builder) => {
    builder
      // Register actions
      .addCase(registerFun.pending, (state) => {
        state.thrRegister.loading = true;
      })
      .addCase(registerFun.fulfilled, (state, action) => {
        state.thrRegister.loading = false;
        state.thrRegister.success = true;
        state.userData = { ...action.payload };
      })
      .addCase(registerFun.rejected, (state, action) => {
        state.thrRegister.loading = false;
        state.thrRegister.error = true;
        state.thrRegister.errMessage = action.payload;
      })

      // Login actions
      .addCase(loginFun.pending, (state) => {
        state.theLogin.loading = true;
      })
      .addCase(loginFun.fulfilled, (state, action) => {
        state.theLogin.loading = false;
        state.theLogin.success = true;
        state.userData = { ...action.payload };
      })
      .addCase(loginFun.rejected, (state, action) => {
        state.theLogin.loading = false;
        state.theLogin.error = true;
        state.theLogin.errMessage = action.payload;
      });
  },
});

export const { logoutUser, resetUserState } = userSlice.actions;
export default userSlice.reducer;
