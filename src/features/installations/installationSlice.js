import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchInstallations,
  addInstallation,
  updateInstallation,
  deleteInstallation,
} from "./installationAPI";

const initialState = {
  records: [],
  status: "idle",
  error: null,
};

// Thunks
export const fetchAllInstallations = createAsyncThunk(
  "installations/fetchAll",
  async () => await fetchInstallations()
);

export const addNewInstallation = createAsyncThunk(
  "installations/add",
  async (data) => await addInstallation(data)
);

export const updateInstallationById = createAsyncThunk(
  "installations/update",
  async ({ id, updatedData }) => await updateInstallation(id, updatedData)
);

export const deleteInstallationById = createAsyncThunk(
  "installations/delete",
  async (id) => {
    await deleteInstallation(id);
    return id;
  }
);

const installationSlice = createSlice({
  name: "installations",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllInstallations.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllInstallations.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.records = action.payload;
      })
      .addCase(fetchAllInstallations.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      .addCase(addNewInstallation.fulfilled, (state, action) => {
        state.records.push(action.payload);
      })

      .addCase(updateInstallationById.fulfilled, (state, action) => {
        const index = state.records.findIndex(
          (r) => r.id === action.payload.id
        );
        if (index !== -1) {
          state.records[index] = action.payload;
        }
      })

      .addCase(deleteInstallationById.fulfilled, (state, action) => {
        state.records = state.records.filter((r) => r.id !== action.payload);
      });
  },
});

export default installationSlice.reducer;
