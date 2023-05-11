import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";
import api from "./apiSlice/apiSlice";

import { setupListeners } from "@reduxjs/toolkit/dist/query";

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware({ serializableCheck: false }).concat(api.middleware),
});

// enable listener behavior for the store
setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
