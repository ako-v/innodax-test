import FlexTable from "components/Table/FlexTable";
import "./App.css";
import { useGetPairsQuery } from "redux/apiSlice/apiSlice";
import { ColumnDef } from "@tanstack/react-table";
import Searchbar from "components/Searchbar/Searchbar";
import { useMemo, useState } from "react";
import Button from "components/Button/Button";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import { addToWatchlist, removeFromWatchlist } from "redux/watchlistSlice/watchlistSlice";
import { useSelector } from "react-redux";

type tableData = {
  name: string;
  lastPrice: number;
  vol24: string;
  localeName: string;
  change24Percentage: number;
};

function App() {
  const { data, isLoading } = useGetPairsQuery();
  const [searchValue, setSearchValue] = useState("");
  const [showWatchlist, setShowWatchlist] = useState(false);
  const watchlist = useAppSelector(store => store.watchlist.watchlist);
  const dispatch = useAppDispatch();

  const columns: ColumnDef<tableData>[] = useMemo(
    () => [
      {
        accessorKey: "name",
        id: "name",
        header: "رمز ارز",
      },
      {
        accessorKey: "lastPrice",
        id: "lastPrice",
        header: "قیمت",
        enableSorting: true,
        cell: params => (
          <div>
            <span>{params.getValue() as string}</span>{" "}
            <span className="text-blue-900 mx-1">{params.row.original.name.includes("/TMN") ? "تومان" : "دلار"}</span>
          </div>
        ),
      },
      {
        accessorKey: "vol24",
        id: "vol24",
        header: "حجم",
        enableSorting: true,
      },
      {
        accessorKey: "change24Percentage",
        id: "change24Percentage",
        header: "تغییر در 24 ساعت",
        enableSorting: true,
        cell: ({ getValue }) => <span dir="ltr">{getValue() as string} %</span>,
      },
      {
        accessorKey: "actions",
        id: "actions",
        header: "عملیات",
        enableSorting: false,
        cell: params => {
          const handleAddToWatchlist = () => {
            dispatch(addToWatchlist(params.row.original.name));
          };
          const handleRemoveFromWatchlist = () => {
            dispatch(removeFromWatchlist(params.row.original.name));
          };
          if (watchlist?.includes(params.row.original.name)) {
            return (
              <Button onClick={handleRemoveFromWatchlist} className="h-6 w-28 bg-red-700 hover:bg-red-800">
                حذف از دیده‌بان
              </Button>
            );
          }
          return (
            <Button onClick={handleAddToWatchlist} className="h-6 w-28">
              اضافه به دیده‌بان
            </Button>
          );
        },
      },
    ],
    [watchlist, dispatch],
  );

  const handleSearch = (value: string) => {
    setSearchValue(value);
  };

  const tableData = useMemo(() => {
    return (
      data?.filter(item => {
        return [item.name, item.localeName].some(item => item.toLowerCase().includes(searchValue.toLowerCase()));
      }) || []
    );
  }, [data, searchValue]);

  const watchlistTableData = useMemo(() => {
    return data?.filter(item => watchlist.includes(item.name)) ?? [];
  }, [data, watchlist]);

  return (
    <div className="flex flex-col gap-2 h-screen p-3 lg:p-10">
      <div className="flex gap-4">
        <Button onClick={() => setShowWatchlist(false)} className="h-12 text-base font-medium flex-1">
          لیست رمز ارزها
        </Button>
        <Button onClick={() => setShowWatchlist(true)} className="h-12 text-base font-medium flex-1">
          دیده‌بان
        </Button>
      </div>
      <div>
        {showWatchlist ? (
          <div>
            <FlexTable
              className="min-w-[800px]"
              loading={isLoading}
              columns={columns}
              data={watchlistTableData}
              rowsLength={watchlistTableData?.length}
              enablePagination
            />
          </div>
        ) : (
          <div>
            <Searchbar onSearch={handleSearch} />
            <FlexTable className="min-w-[800px]" loading={isLoading} columns={columns} data={tableData} rowsLength={data?.length} enablePagination />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
