import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import TablePagination from "./TablePagination";

const doNothingFunction = () => {
  /* do nothing */
};

describe("TablePagination", () => {
  test("renders TablePagination component", () => {
    render(
      <TablePagination
        rowsPerPageOptions={[5, 10, 15]}
        count={20}
        rowsPerPage={5}
        page={0}
        onPageChange={doNothingFunction}
        onRowsPerPageChange={doNothingFunction}
      />,
    );
    expect(screen.getByText("صفحه قبل")).toBeInTheDocument();
    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("صفحه بعد")).toBeInTheDocument();
    expect(screen.getByTestId("rows-per-page")).toBeInTheDocument();
  });

  test('clicking on "صفحه قبل" button decreases the page number', () => {
    const onPageChange = jest.fn();
    render(
      <TablePagination
        rowsPerPageOptions={[5, 10, 15]}
        count={20}
        rowsPerPage={5}
        page={1}
        onPageChange={onPageChange}
        onRowsPerPageChange={doNothingFunction}
      />,
    );
    fireEvent.click(screen.getByText("صفحه قبل"));
    expect(onPageChange).toHaveBeenCalledWith(expect.anything(), 0);
  });

  test('clicking on "صفحه بعد" button increases the page number', () => {
    const onPageChange = jest.fn();
    render(
      <TablePagination
        rowsPerPageOptions={[5, 10, 15]}
        count={20}
        rowsPerPage={5}
        page={0}
        onPageChange={onPageChange}
        onRowsPerPageChange={doNothingFunction}
      />,
    );
    fireEvent.click(screen.getByText("صفحه بعد"));
    expect(onPageChange).toHaveBeenCalledWith(expect.anything(), 1);
  });

  test('disables "صفحه بعد" button when the user is already on the last page', () => {
    render(
      <TablePagination
        rowsPerPageOptions={[5, 10, 15]}
        count={20}
        rowsPerPage={5}
        page={3}
        onPageChange={doNothingFunction}
        onRowsPerPageChange={doNothingFunction}
      />,
    );
    expect(screen.getByText("صفحه بعد")).toBeDisabled();
  });

  test('selecting an option in the "rows per page" dropdown calls the onRowsPerPageChange function with the selected value', () => {
    const onRowsPerPageChange = jest.fn();
    render(
      <TablePagination
        rowsPerPageOptions={[5, 10, 15]}
        count={20}
        rowsPerPage={5}
        page={0}
        onPageChange={doNothingFunction}
        onRowsPerPageChange={onRowsPerPageChange}
      />,
    );
    const select = screen.getByTestId("rows-per-page");
    fireEvent.change(select, { target: { value: "10" } });
    expect(onRowsPerPageChange).toHaveBeenCalledWith(expect.anything());
  });
});
