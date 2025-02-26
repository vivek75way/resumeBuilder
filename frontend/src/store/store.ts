import { configureStore } from "@reduxjs/toolkit";
import resumeReducer from "./reducers/resumeReducer";
import authReducer from "./reducers/authReducer";
import { api } from "../services/api"; 

export const store = configureStore({
  reducer: {
    auth: authReducer,
    resume: resumeReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware), 
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
