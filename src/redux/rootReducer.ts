import { combineReducers } from "@reduxjs/toolkit";
import api from "./apiSlice/apiSlice";

export default combineReducers({
  [api.reducerPath]: api.reducer,
});
