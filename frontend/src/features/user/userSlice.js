import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

const initialState = {
  loading: false,
  first_name: "",
  last_name: "",
  email: "",
  id: "",
  jwt: "",
  errors: "",
};

export const loginUser = createAsyncThunk(
  "user/login",
  async ({ email, password }, thunkAPI) => {
    console.log(`Email: ${email}`);
    console.log(`Password: ${password}`);
    return axios
      .post("http://localhost:8000/api/user/login", {
        email: email,
        password: password,
      })
      .then((responce) => responce.data);
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      state.loading = false;
      state.first_name = "";
      state.last_name = "";
      state.email = "";
      state.id = "";
      state.jwt = "";
      state.errors = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.loading = false;
      (state.first_name = action.payload.firstName),
        (state.last_name = action.payload.lastName),
        (state.email = action.payload.email),
        (state.id = action.payload._id),
        (state.jwt = action.payload.token);
    });

    builder.addCase(loginUser.rejected, (state, action) => {
      state.loading = false;
      state.errors = action.payload;
    });
  },
});

// Action creators are generated for each case reducer function
export const { logout } = userSlice.actions;

export const getCurrentUser = () => {
  return useSelector((state) => state.user);
};

export const userReducer = userSlice.reducer;
