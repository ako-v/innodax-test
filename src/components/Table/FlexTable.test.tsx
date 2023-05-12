import React from "react";
import { render, fireEvent, within } from "@testing-library/react";

import FlexTable from "./FlexTable";

describe("FlexTable", () => {
  test("renders without error", () => {
    render(<FlexTable columns={[]} data={[]} />);
  });

  test("shows loading spinner", () => {
    const { getByTestId } = render(<FlexTable columns={[]} data={[]} loading />);
    expect(getByTestId("spinner")).toBeInTheDocument();
  });

  test("renders table with correct headers", () => {
    const columns = [
      { header: "ID", accessorKey: "id" },
      { header: "Name", accessorKey: "name" },
      { header: "Age", acceaccessorKeyssor: "age" },
    ];
    const data = [
      { id: 1, name: "John", age: 20 },
      { id: 2, name: "Emily", age: 25 },
    ];
    const { getAllByRole } = render(<FlexTable columns={columns} data={data} />);
    const headers = getAllByRole("columnheader").map(header => within(header).getByText(/[A-Z]/));
    expect(headers).toHaveLength(3);
    expect(headers[0]).toHaveTextContent("ID");
    expect(headers[1]).toHaveTextContent("Name");
    expect(headers[2]).toHaveTextContent("Age");
  });

  test("renders table with correct data", () => {
    const columns = [
      { header: "ID", accessorKey: "id" },
      { header: "Name", accessorKey: "name" },
      { header: "Age", accessorKey: "age" },
    ];
    const data = [
      { id: 1, name: "John", age: 20 },
      { id: 2, name: "Emily", age: 25 },
    ];
    const { getAllByRole } = render(<FlexTable columns={columns} data={data} />);

    const cellTexts = getAllByRole("cell").map(cell => cell.textContent);
    expect(cellTexts).toHaveLength(6);
    expect(cellTexts).toContain("1");
    expect(cellTexts).toContain("John");
    expect(cellTexts).toContain("20");
    expect(cellTexts).toContain("2");
    expect(cellTexts).toContain("Emily");
    expect(cellTexts).toContain("25");
  });

  test("shows pagination component", () => {
    const { getByTestId } = render(<FlexTable columns={[]} data={[]} enablePagination />);
    expect(getByTestId("rows-per-page")).toBeInTheDocument();
  });

  test("calls onPageChange prop when page is changed", () => {
    const handlePageChange = jest.fn();
    const { getByTestId, getByText } = render(<FlexTable columns={[]} data={[]} enablePagination onPageChange={handlePageChange} rowsLength={20} />);
    fireEvent.change(getByTestId("rows-per-page"), { target: { value: "10" } });
    expect(handlePageChange).toHaveBeenCalledWith(0, 10);

    fireEvent.click(getByText("صفحه بعد"));
    expect(handlePageChange).toHaveBeenCalledWith(1, 10);
  });
});
