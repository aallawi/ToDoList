import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_APP_BASE_URL;
const axiosInstance = axios.create({ baseURL: BASE_URL });

const fetchTasksData = async (userId) => {
  const response = await axiosInstance.get(`/user/${userId}/tasks`);
  return response.data;
};

// Create Task
export const createTask = createAsyncThunk(
  "task/create",
  async ({ userId, taskData }, { rejectWithValue }) => {
    try {
      await axiosInstance.post(`user/${userId}/tasks`, taskData);
      const data = await fetchTasksData(userId);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "An error occurred");
    }
  }
);

// Fetch Tasks
export const fetchTasks = createAsyncThunk(
  "task/fetch",
  async (userId, { rejectWithValue }) => {
    try {
      const data = await fetchTasksData(userId);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "An error occurred");
    }
  }
);

// Delete Task
export const deleteTask = createAsyncThunk(
  "task/delete",
  async ({ userId, taskId }, { rejectWithValue }) => {
    try {
      await axiosInstance.delete(`/user/${userId}/tasks/${taskId}`);
      const data = await fetchTasksData(userId);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "An error occurred");
    }
  }
);

// Update Task
export const updateTask = createAsyncThunk(
  "task/update",
  async ({ userId, taskId, taskData }, { rejectWithValue }) => {
    try {
      await axiosInstance.put(`/user/${userId}/tasks/${taskId}`, taskData);
      const data = await fetchTasksData(userId);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "An error occurred");
    }
  }
);

const initialState = {
  tasks: [],

  theCreate: {
    loading: false,
    success: false,
    error: false,
    successMsg: "",
    errorMsg: "",
  },

  theUpdate: {
    loading: false,
    success: false,
    error: false,
    successMsg: "",
    errorMsg: "",
  },

  theDelete: {
    loading: false,
    success: false,
    error: false,
    successMsg: "",
    errorMsg: "",
  },
};

const taskSlice = createSlice({
  name: "task",
  initialState,

  reducers: {
    removeAllTasks: (state) => {
      state.tasks = [];
    },
    resetTaskState: (state) => {
      Object.assign(state, initialState);
    },
  },

  extraReducers: (builder) => {
    builder
      // Create actions
      .addCase(createTask.pending, (state) => {
        state.theCreate.loading = true;
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.theCreate.loading = false;
        state.theCreate.success = true;
        state.theCreate.successMsg = "A New Task Has Been Created";
        state.tasks = [...action.payload];
      })
      .addCase(createTask.rejected, (state) => {
        state.theCreate.loading = false;
        state.theCreate.error = true;
        state.theCreate.errorMsg = "Error!! Failed To Create New Task";
      })

      // Fetch All actions
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.tasks = [...action.payload];
      })

      // Delete actions
      .addCase(deleteTask.pending, (state) => {
        state.theDelete.loading = true;
      })
      .addCase(deleteTask.rejected, (state) => {
        state.theDelete.loading = false;
        state.theDelete.error = true;
        state.theDelete.errorMsg = "Error!! Failed To Delete Task.";
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.theDelete.loading = false;
        state.theDelete.success = true;
        state.theDelete.successMsg = "Task Has Been Deleted Successfully";
        state.tasks = [...action.payload];
      })

      // Update actions
      .addCase(updateTask.pending, (state) => {
        state.theUpdate.loading = true;
      })
      .addCase(updateTask.rejected, (state) => {
        state.theUpdate.loading = false;
        state.theUpdate.error = true;
        state.theUpdate.errorMsg = "Error!! Failed To Update Task";
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        state.theUpdate.loading = false;
        state.theUpdate.success = true;
        state.theUpdate.successMsg = "Task Has Been Updated";
        state.tasks = [...action.payload];
      });
  },
});

export const { removeAllTasks, resetTaskState } = taskSlice.actions;
export default taskSlice.reducer;
