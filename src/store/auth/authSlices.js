import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authServices";
import toast from "react-hot-toast";

const getTokenFromLocalStorage = localStorage.getItem("admin")
  ? JSON.parse(localStorage.getItem("admin"))
  : null;

const initialState = {
  user: getTokenFromLocalStorage,
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};

export const adminLogin = createAsyncThunk(
  "auth/admin-login",
  async (data, thunkAPI) => {
    try {
      return await authService.adminLogin(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const updateProfile = createAsyncThunk(
  "auth/update-profile",
  async (data, thunkAPI) => {
    try {
      return await authService.updateProfile(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);
export const changeDarkMode = createAsyncThunk(
  "auth/update",
  async (data, thunkAPI) => {
    try {
      return await authService.changeDarkMode(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    messageClear: (state) => {
      state.isSuccess = false;
      state.isError = false;
    },
    user_reset: (state) => {
      state.user = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(adminLogin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(adminLogin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = "success";
        state.user = action.payload;
      })
      .addCase(adminLogin.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(updateProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = "Profile updated successfully";
        state.user = { ...state.user, ...action.payload }; // Update user data
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload || "Profile update failed";
      })
      .addCase(changeDarkMode.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(changeDarkMode.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = "mode changed successfully";
        if (action.payload.preference) {
          state.user.preference = action.payload.preference;
        }
      })
      .addCase(changeDarkMode.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload || "Profile update failed";
      });
  },
});

export const { messageClear, user_reset } = authSlice.actions;

export default authSlice.reducer;
