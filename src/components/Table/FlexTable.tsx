import { useState, useCallback, useMemo } from "react";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  Row,
  RowData,
  SortingState,
  useReactTable,
  HeaderGroup,
  Header,
  Cell,
} from "@tanstack/react-table";

import Spinner from "../Spinner/Spinner";
import HeaderCell from "components/HeaderCell/HeaderCell";
import TablePagination from "components/TablePagination/TablePagination";
import clsx from "clsx";

declare module "@tanstack/react-table" {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface ColumnMeta<TData extends RowData, TValue> {
    minWidth?: string | number;
    maxWidth?: string | number;
    visible?: boolean;
    dataIndex?: string;
    sortFunction?: (a: TData, b: TData) => number;
  }
}

export interface FlexTableProps<TData> {
  columns: ColumnDef<TData>[];
  data: TData[];
  loading?: boolean;
  className?: string;
  enablePagination?: boolean;
  rowsLength?: number;
  currentPage?: number;
  onPageChange?: (page: number, rowsPerPage: number) => void;
  rowsPerPageArray?: number[];
}

/**
 * if we simply assign [] to data it causes infinit rerender.
 * The infinite render is caused because it creates a new empty array on every render and [] !== [].
 * @see: https://github.com/TanStack/table/issues/4240
 */
const emptyArray: any[] = [];

const FlexTable = <TData,>(props: FlexTableProps<TData>) => {
  const {
    columns = [],
    data = emptyArray,
    loading,
    className,
    enablePagination,
    onPageChange,
    currentPage,
    rowsLength = 0,
    rowsPerPageArray = [10, 25, 50],
  } = props;

  const [sorting, setSorting] = useState<SortingState>([]);

  const [page, setPage] = useState(currentPage || 0);
  const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageArray[0]);

  const handleChangePage = useCallback(
    (event: unknown, newPage: number) => {
      onPageChange?.(newPage, rowsPerPage);
      setPage(newPage);
    },
    [rowsPerPage, onPageChange],
  );

  const handleChangeRowsPerPage = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      setRowsPerPage(+event.target.value);
      onPageChange?.(0, +event.target.value);
      setPage(0);
    },
    [onPageChange],
  );

  const pagedData = useMemo(() => {
    if (!onPageChange && enablePagination) {
      return data.filter((item, index) => {
        let inRange = false;
        if (index >= page * rowsPerPage && index < (page + 1) * rowsPerPage) inRange = true;
        return inRange;
      });
    }
    return data;
  }, [data, onPageChange, enablePagination, rowsPerPage, page]);

  const table = useReactTable({
    data: pagedData,
    columns,
    state: { sorting },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
  });

  return (
    <div className="overflow-auto max-h-[100%] w-full relative">
      {loading && <Spinner center />}
      <div role="table" className={clsx(className)}>
        <div className="sticky top-0 z-10">
          {table.getHeaderGroups().map((headerGroup: HeaderGroup<TData>) => (
            <div className="flex items-center gap-px" role="rowheader" key={headerGroup.id}>
              {headerGroup.headers.map((header: Header<TData, unknown>) => (
                <HeaderCell header={header} key={header.id} />
              ))}
            </div>
          ))}
        </div>
        <div className="flex flex-col flex-nowrap gap-px mt-1px">
          {table.getRowModel().rows.map((row: Row<TData>, rowIndex: number) => (
            <div role="row" className="flex items-center gap-px" key={row.id}>
              {row.getVisibleCells().map((cell: Cell<TData, unknown>) => (
                <div
                  role="cell"
                  key={cell.id}
                  className={`p-0.5 w-full h-7 flex items-center justify-center ${rowIndex % 2 ? "bg-blue-200" : "bg-white"}`}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      {enablePagination && (
        <TablePagination
          rowsPerPageOptions={rowsPerPageArray}
          count={rowsLength}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      )}
    </div>
  );
};

export default FlexTable;
