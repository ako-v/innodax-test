import { combineReducers } from "@reduxjs/toolkit";
import api from "./apiSlice/apiSlice";
import watchlistReducer from "./watchlistSlice/watchlistSlice";

export default combineReducers({
  [api.reducerPath]: api.reducer,
  watchlist: watchlistReducer,
});
