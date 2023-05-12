export type TablePaginationProps = {
  rowsPerPageOptions: number[];
  count: number;
  rowsPerPage: number;
  page: number;
  onPageChange: (event: unknown, newPage: number) => void;
  onRowsPerPageChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
};

const TablePagination = (props: TablePaginationProps) => {
  const { count, onPageChange, onRowsPerPageChange, page, rowsPerPage, rowsPerPageOptions } = props;
  const handleGoToNextPage = (e: React.MouseEvent<HTMLButtonElement>) => {
    if ((page + 1) * rowsPerPage < count) {
      onPageChange(e, page + 1);
    }
  };
  const handleGoToPreviousPage = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (page > 0) {
      onPageChange(e, page - 1);
    }
  };

  return (
    <div className="flex gap-2 m-2">
      <button
        type="button"
        className="text-white bg-blue-600 hover:bg-blue-700 font-medium rounded text-sm py-1 px-2"
        onClick={handleGoToPreviousPage}
      >
        صفحه قبل
      </button>
      <span className="text-white bg-blue-500 font-medium rounded text-sm px-3 py-1">{page + 1}</span>
      <button
        className="text-white bg-blue-600 hover:bg-blue-700 font-medium rounded text-sm py-1 px-2"
        disabled={(page + 1) * rowsPerPage >= count}
        onClick={handleGoToNextPage}
      >
        صفحه بعد
      </button>
      <select className="w-16 text-white bg-blue-600 rounded py-1 px-2" name="pages" onChange={onRowsPerPageChange} data-testid="rows-per-page">
        {rowsPerPageOptions.map(rowPerPage => {
          return (
            <option value={rowPerPage} key={rowPerPage}>
              {rowPerPage}
            </option>
          );
        })}
      </select>
    </div>
  );
};
export default TablePagination;
