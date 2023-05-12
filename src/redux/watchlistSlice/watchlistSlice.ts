import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { getFromLocalStorage, saveToLocalStorage } from "utils/storage";

const WATCHLIST = "WATCHLIST";

export interface WatchlistState {
  watchlist: string[];
}

const initialState: WatchlistState = {
  watchlist: getFromLocalStorage(WATCHLIST) ?? [],
};

const watchlistSlice = createSlice({
  initialState: initialState,
  name: "watchlist",
  reducers: {
    addToWatchlist: (state, action: PayloadAction<string>) => {
      state.watchlist.push(action.payload);
      saveToLocalStorage(WATCHLIST, state.watchlist);
    },
    removeFromWatchlist: (state, action: PayloadAction<string>) => {
      state.watchlist = state.watchlist.filter(item => item !== action.payload);
      saveToLocalStorage(WATCHLIST, state.watchlist);
    },
  },
});

export default watchlistSlice.reducer;

export const { addToWatchlist, removeFromWatchlist } = watchlistSlice.actions;
