import { act, fireEvent, getAllByText, render, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useGetPairsQuery } from "redux/apiSlice/apiSlice";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import * as redux from "react-redux";
import { addToWatchlist, removeFromWatchlist } from "redux/watchlistSlice/watchlistSlice";
import App from "./App";

jest.mock("redux/apiSlice/apiSlice");
jest.mock("redux/hooks", () => ({
  useAppSelector: jest.fn(),
  useAppDispatch: jest.fn(),
}));

describe("App", () => {
  beforeEach(() => {
    (useGetPairsQuery as jest.Mock).mockReturnValue({
      data: [{ name: "BTC/USDT", lastPrice: 50000, vol24: "100", localeName: "Bitcoin", change24Percentage: 2 }],
    });
    (useAppSelector as jest.Mock).mockReturnValue([]);
    (useAppDispatch as jest.Mock).mockReturnValue(jest.fn());
  });

  test("renders correctly", async () => {
    const { getByText, getByPlaceholderText } = render(<App />);
    const searchInput = getByPlaceholderText("جستجوی ارز");
    const addButton = getByText("اضافه به دیده‌بان");
    expect(searchInput).toBeInTheDocument();
    expect(addButton).toBeInTheDocument();
    await waitFor(() => expect(getByText("BTC/USDT")).toBeInTheDocument());
  });

  test("filters table data based on searchbar input", async () => {
    jest.useFakeTimers();
    (useGetPairsQuery as jest.Mock).mockReturnValue({
      data: [
        { name: "BTC/USDT", lastPrice: 50000, vol24: "100", localeName: "Bitcoin", change24Percentage: 2 },
        { name: "ETH/USDT", lastPrice: 3000, vol24: "50", localeName: "Ethereum", change24Percentage: 1 },
      ],
    });
    const { getByPlaceholderText, getByText, queryByText } = render(<App />);
    const searchInput = getByPlaceholderText("جستجوی ارز");
    await act(async () => {
      userEvent.type(searchInput, "eth");
      jest.advanceTimersByTime(400);
    });

    expect(getByText("ETH/USDT")).toBeInTheDocument();
    expect(queryByText("BTC/USDT")).not.toBeInTheDocument();
  });

  test("switches between table and watchlist view", async () => {
    (useAppSelector as jest.Mock).mockReturnValue(["BTC/USDT"]);

    (useGetPairsQuery as jest.Mock).mockReturnValue({
      data: [
        { name: "BTC/USDT", lastPrice: 50000, vol24: "100", localeName: "Bitcoin", change24Percentage: 2 },
        { name: "ETH/USDT", lastPrice: 3000, vol24: "50", localeName: "Ethereum", change24Percentage: 1 },
      ],
    });

    const { getByText, queryByText } = render(<App />);
    const tableButton = getByText("لیست رمز ارزها");
    const watchlistButton = getByText("دیده‌بان");
    expect(getByText("BTC/USDT")).toBeInTheDocument();
    await act(async () => {
      userEvent.click(watchlistButton);
    });
    expect(getByText("BTC/USDT")).toBeInTheDocument();
    expect(queryByText("ETH/USDT")).not.toBeInTheDocument();
    await act(async () => {
      userEvent.click(tableButton);
    });
    expect(getByText("BTC/USDT")).toBeInTheDocument();
  });

  test("adds and removes items from watchlist", async () => {
    (useGetPairsQuery as jest.Mock).mockReturnValue({
      data: [
        { name: "BTC/USDT", lastPrice: 50000, vol24: "100", localeName: "Bitcoin", change24Percentage: 2 },
        { name: "ETH/USDT", lastPrice: 3000, vol24: "50", localeName: "Ethereum", change24Percentage: 1 },
      ],
    });
    (useAppSelector as jest.Mock).mockReturnValue(["BTC/USDT"]);
    const dispatchMock = jest.fn();
    (useAppDispatch as jest.Mock).mockReturnValue(dispatchMock);
    const { getAllByText } = render(<App />);
    const addButton = getAllByText("اضافه به دیده‌بان");

    userEvent.click(addButton[0]);

    expect(dispatchMock).toHaveBeenCalledWith(addToWatchlist("ETH/USDT"));

    const removeButton = getAllByText("حذف از دیده‌بان");
    userEvent.click(removeButton[0]);
    expect(dispatchMock).toHaveBeenCalledWith(removeFromWatchlist("BTC/USDT"));
  });
});
