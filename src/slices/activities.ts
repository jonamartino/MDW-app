import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Activity } from "../types/activities";
import api from "../config/axios";

interface ActivitiesState {
  list: Activity[];
  loading: boolean;
  error: string | undefined;
}

export const getActivities = createAsyncThunk(
  "activities/getActivities",
  async () => {
    const response = await api.get("/activities");
    return response.data.data;
  }
);

const initialState: ActivitiesState = {
  list: [],
  loading: false,
  error: undefined,
};

const slice = createSlice({
  name: "activities",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getActivities.pending, (state) => {
        state.loading = true;
        state.error = initialState.error;
      })
      .addCase(getActivities.fulfilled, (state, action) => {
        state.loading = initialState.loading;
        state.list = action.payload;
      })
      .addCase(getActivities.rejected, (state, action) => {
        state.loading = initialState.loading;
        state.error = action.error.message;
      });
  },
});

export const reducer = slice.reducer;

export default reducer;
