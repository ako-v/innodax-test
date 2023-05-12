import { useRef, useState } from "react";

export type SearchbarProps = {
  onSearch: (value: string) => void;
};

const Searchbar = (props: SearchbarProps) => {
  const [value, setValue] = useState("");
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      props.onSearch(e.target.value);
    }, 400);
  };
  return (
    <div className="relative">
      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
        <svg
          aria-hidden="true"
          className="w-5 h-5 text-gray-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
        </svg>
      </div>
      <input
        type="search"
        id="default-search"
        className="block h-10 my-1 w-full p-4 pr-10 text-sm text-gray-900 border border-gray-300 rounded bg-blue-100 focus-visible:ring-blue-500 focus-visible:border-blue-500 focus-visible:outline-none"
        placeholder="جستجوی ارز"
        value={value}
        onChange={handleChange}
      />
    </div>
  );
};
export default Searchbar;
