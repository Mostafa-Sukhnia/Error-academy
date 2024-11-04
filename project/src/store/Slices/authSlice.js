import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getUsers = createAsyncThunk(
  "authSlice/getusers",
  async (_, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
      const res = await fetch("http://localhost:5000/users");
      if (!res.ok) {
        throw new Error("Failed to fetch users");
      }
      const data = await res.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const loginuser = createAsyncThunk(
  "authSlice/loginuser",
  async ({ email, password }, thunkApi) => {
    const { dispatch } = thunkApi;
    const usersResponse = await dispatch(getUsers()).unwrap();
    const user = usersResponse.find(
      (user) => user.email === email && user.password === password
    );
    if (!user) {
      return thunkApi.rejectWithValue("Invalid email or password");
    }
    return { user, courses: user.courses };
  }
);

export const signup = createAsyncThunk(
  "authSlice/signup",
  async (userData, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
      const newUser = { ...userData, courses: [] };
      const res = await fetch(`http://localhost:5000/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });
      const data = await res.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const logout = createAsyncThunk(
  "authSlice/logout",
  async (_, thunkApi) => {
    return null;
  }
);

const uploadImage = async (file, _) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "ky6n5kok");
  const res = await fetch(
    `https://api.cloudinary.com/v1_1/dwogc4ywh/image/upload`,
    {
      method: "POST",
      body: formData,
    }
  );
  const data = await res.json();
  return data.secure_url;
};

export const edite = createAsyncThunk(
  "authSlice/edite",
  async (img, thunkApi) => {
    const { rejectWithValue, getState } = thunkApi;
    const state = getState();
    const userId = state.authSlice.you.id;

    try {
      const userResponse = await fetch(`http://localhost:5000/users/${userId}`);
      if (!userResponse.ok) {
        throw new Error("Failed to fetch user data");
      }
      const userData = await userResponse.json();
      const imageUrl = await uploadImage(img);
      const res = await fetch(`http://localhost:5000/users/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...userData, image: imageUrl }),
      });
      if (!res.ok) {
        throw new Error("Failed to update image");
      }
      const data = await res.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  users: [],
  loading: false,
  error: null,
  loggedInUser: { courses: [] },
  courses: [],
  you: null,
};

const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        console.log(action.error);
      })
      .addCase(loginuser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginuser.fulfilled, (state, action) => {
        state.loading = false;
        state.loggedInUser = action.payload.user;
        state.courses = [];
        state.you = action.payload.user;
      })
      .addCase(loginuser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(signup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.loading = false;
        state.loggedInUser = action.payload;
        state.you = action.payload;
      })
      .addCase(signup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(logout.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.loading = false;
        state.you = null;
        localStorage.removeItem("yourEmail");
      })
      .addCase(logout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(edite.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(edite.fulfilled, (state, action) => {
        state.loading = false;
        state.you = { ...action.payload };
      })
      .addCase(edite.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default authSlice.reducer;
