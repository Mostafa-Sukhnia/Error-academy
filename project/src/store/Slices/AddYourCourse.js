import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const uploadImage = async (image) => {
  const formData = new FormData();
  formData.append("file", image);
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

export const uploadVideo = async (video) => {
  const formData = new FormData();
  formData.append("file", video);
  formData.append("upload_preset", "ky6n5kok");
  const res = await fetch(
    "https://api.cloudinary.com/v1_1/dwogc4ywh/video/upload",
    {
      method: "POST",
      body: formData,
    }
  );

  if (!res.ok) {
    throw new Error("Failed to upload video");
  }

  const data = await res.json();
  return data.secure_url;
};

export const updateCourses = createAsyncThunk(
  "Course/updateCourses",
  async (courseData, thunkApi) => {
    try {
      // إرسال التحديثات إلى السيرفر
      const updateRes = await fetch(
        `http://localhost:5000/users/${courseData.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(courseData),
        }
      );

      // تحقق مما إذا كانت الاستجابة ناجحة
      if (!updateRes.ok) {
        throw new Error("Failed to update course data");
      }

      // استرجاع البيانات المحدثة
      const updatedUser = await updateRes.json();
      return updatedUser;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const Addcourse = createAsyncThunk(
  "Course/Addcourse",
  async (courseData, thunkApi) => {
    try {
      const img = await uploadImage(courseData.image);
      const userRes = await fetch(
        `http://localhost:5000/users/${courseData.id}`
      );
      const user = await userRes.json();

      const newCourse = {
        courseId: Math.floor(Math.random() * 500),
        titel: courseData.titel,
        descripe: courseData.descripe,
        difficulty: courseData.difficulty,
        type: courseData.type,
        advertisement: courseData.advertisement,
        img,
        videos:[]
      };

      const updatedCourses = [...user.courses, newCourse];

      const res = await fetch(`http://localhost:5000/users/${courseData.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          courses: updatedCourses,
        }),
      });

      const data = await res.json();
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

const initialState = {
  error: "",
  loading: false,
  cource: [],
};

export const getCources = createAsyncThunk(
  "Course/getCources",
  async (id, thunkApi) => {
    try {
      const res = await fetch(`http://localhost:5000/users/${id}`);
      const data = await res.json();
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

const Course = createSlice({
  name: "course",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(Addcourse.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(Addcourse.fulfilled, (state, action) => {
        state.loading = false;
        state.cource = action.payload.courses; // تحديث الكورسات فقط بعد إضافة كورس جديد
      })
      .addCase(Addcourse.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getCources.fulfilled, (state, action) => {
        state.cource = action.payload.courses; // تخزين الكورسات المسترجعة بدلاً من إضافة بيانات جديدة
      })
      .addCase(getCources.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(updateCourses.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateCourses.fulfilled, (state, action) => {
        state.loading = false;
        state.cource = action.payload.courses; // تحديث الكورسات المسترجعة من السيرفر
        
      })
      .addCase(updateCourses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default Course.reducer;
