import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";

export default function Filter({ filterField, options }: any) {
  const [searchParams, setSearchParams] = useSearchParams();
  const filteredValue = searchParams.get(filterField) || "all";
  function handleClick(value: string) {
    searchParams.set(filterField, value);
    setSearchParams(searchParams);
  }
  return (
    <div className="border border-gray-300 shadow-sm  rounded-lg px-2 py-1 flex gap-1 ">
      {options.map((option: any) => (
        <button
          key={option.value}
          onClick={() => handleClick(option.value)}
          className={`active:bg-sky-500 active:text-white px-3 font-medium  py-1 rounded-md ${
            filteredValue === option.value ? "bg-sky-500 text-white" : ""
          }`}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
