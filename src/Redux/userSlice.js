import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_APP_BASE_URL;
const axiosInstance = axios.create({ baseURL: BASE_URL });

export const registerFun = createAsyncThunk(
  "user/register",
  async (objectData, { rejectWithValue }) => {
    try {
      const { userName } = objectData;
      const { data } = await axiosInstance.get("/user");

      if (data.some((user) => user.userName === userName)) {
        return rejectWithValue("This User Is Already Registered");
      }

      const response = await axiosInstance.post("/user", objectData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "An error occurred");
    }
  }
);

const initialState = {
  userData: {},

  thrRegister: {
    loading: false,
    success: false,
    error: false,
    errMessage: "",
  },

  loggedIN: {
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
    clearUserData: (state) => {
      state.userData = null;
    },
    cleanUserState: (state) => {
      Object.assign(state, initialState);
    },
  },

  extraReducers: (builder) => {
    builder
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
      });
  },
});

export const { clearUserData, cleanUserState } = userSlice.actions;
export default userSlice.reducer;
