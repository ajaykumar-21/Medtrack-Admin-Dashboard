import { configureStore } from "@reduxjs/toolkit";
import installationReducer from "../features/installations/installationSlice";
import devicesReducer from "../features/devices/deviceSlice";

export const store = configureStore({
  reducer: {
    devices: devicesReducer,
    installations: installationReducer,
  },
});
