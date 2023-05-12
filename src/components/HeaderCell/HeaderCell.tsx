import { HtmlHTMLAttributes } from "react";
import { Header, flexRender } from "@tanstack/react-table";

interface IProps<TData, TMeta> extends HtmlHTMLAttributes<HTMLDivElement> {
  header: Header<TData, TMeta>;
}

const HeaderCell = <TData, TMeta>(props: IProps<TData, TMeta>) => {
  const { header, ...rest } = props;
  const { column } = header;

  return (
    <div role="columnheader" className="flex items-center justify-center w-full relative h-7 bg-blue-400 " {...rest}>
      <div className="absolute left-0 top-0 right-0 bottom-0 [&>*]:opacity-0 hover:[&>*]:opacity-100">
        {column.getCanSort() && (
          <div
            className={`absolute left-1 top-1/2 -translate-y-1/2 cursor-pointer ${column.getIsSorted() ? "opacity-100" : "opacity-0"}`}
            onClick={column.getToggleSortingHandler()}
          >
            ↓
          </div>
        )}
      </div>

      <p className="p-0 font-medium">{header.isPlaceholder ? null : flexRender(column.columnDef.header, header.getContext())}</p>
    </div>
  );
};

export default HeaderCell;
