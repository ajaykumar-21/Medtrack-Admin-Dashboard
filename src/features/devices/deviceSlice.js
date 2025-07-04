import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchDevices,
  addDevice,
  updateDevice,
  deleteDevice,
} from "./deviceAPI";

// Initial state for devices
const initialState = {
  items: [],
  status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

// Thunks for async API actions
export const fetchAllDevices = createAsyncThunk(
  "devices/fetchAll",
  async () => {
    const data = await fetchDevices();
    return data;
  }
);

export const addNewDevice = createAsyncThunk("devices/add", async (device) => {
  const data = await addDevice(device);
  return data;
});

export const updateDeviceById = createAsyncThunk(
  "devices/update",
  async ({ id, updatedData }) => {
    const data = await updateDevice(id, updatedData);
    return data;
  }
);

export const deleteDeviceById = createAsyncThunk(
  "devices/delete",
  async (id) => {
    await deleteDevice(id);
    return id;
  }
);

const deviceSlice = createSlice({
  name: "devices",
  initialState,
  reducers: {
    // You can add local reducers if needed
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllDevices.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllDevices.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchAllDevices.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      .addCase(addNewDevice.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })

      .addCase(updateDeviceById.fulfilled, (state, action) => {
        const index = state.items.findIndex((d) => d.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })

      .addCase(deleteDeviceById.fulfilled, (state, action) => {
        state.items = state.items.filter((d) => d.id !== action.payload);
      });
  },
});

export default deviceSlice.reducer;
