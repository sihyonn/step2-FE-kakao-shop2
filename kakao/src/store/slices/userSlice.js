import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { login } from "../../services/api";

const initialState = {
  email: null,
  loadin: false,
};

const userSlice = createSlice({
  name: "user", //구분자
  initialState,
  reducers: {
    setEmail: (state, action) => {
      state.email = action.payload.email;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginRequest.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(loginRequest.fulfilled, (state, action) => {
      state.loading = false;
      state.email = action.payload.email;
    });
    builder.addCase(loginRequest.rejected, (state, action) => {
      state.loading = false;
    });
  },
});

export const loginRequest = createAsyncThunk(
  "user/loginRequest",
  async (data) => {
    const { email, password } = data;
    const response = await login({ email, password });
    return {
      email: email,
      token: response.data,
    };
  }
);

export const { setEmail } = userSlice.actions;
export default userSlice.reducer;