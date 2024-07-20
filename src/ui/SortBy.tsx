import React from "react";
import { useSearchParams } from "react-router-dom";

export default function SortBy({ options }: any) {
  const [searchParams, setSearchParams] = useSearchParams();
  const filteredValue = searchParams.get("sortBy") || "created-asc";

  function handleChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const value = event.target.value;
    searchParams.set("sortBy", value); // Correct the key here
    setSearchParams(searchParams);
  }

  return (
    <select
      id="sortBy"
      name="sortBy"
      className=" dark:bg-gray-900 font-medium flex justify-center text-center bg-grey-100 border border-grey-200 text-grey-600 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5"
      value={filteredValue}
      onChange={handleChange}
    >
      {options.map((option: any) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}
