import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Searchbar from "./Searchbar";

describe("Searchbar", () => {
  test("renders correctly", () => {
    const { getByPlaceholderText } = render(
      <Searchbar
        onSearch={() => {
          /* do nothing */
        }}
      />,
    );
    const input = getByPlaceholderText("جستجوی ارز");
    expect(input).toBeInTheDocument();
  });

  test("debounces onSearch callback for 400ms", () => {
    jest.useFakeTimers();
    const onSearchMock = jest.fn();
    const { getByPlaceholderText } = render(<Searchbar onSearch={onSearchMock} />);
    const input = getByPlaceholderText("جستجوی ارز");
    fireEvent.change(input, { target: { value: "eth" } });
    expect(onSearchMock).not.toHaveBeenCalled();
    jest.advanceTimersByTime(200);
    fireEvent.change(input, { target: { value: "ltc" } });
    expect(onSearchMock).not.toHaveBeenCalled();
    jest.advanceTimersByTime(200);
    expect(onSearchMock).not.toHaveBeenCalledWith("eth");
    jest.advanceTimersByTime(200);
    expect(onSearchMock).toHaveBeenCalledWith("ltc");
  });
});
