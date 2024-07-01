import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";

export default function Filter() {
  const [searchParams, setSearchParams] = useSearchParams();
  const filteredValue = searchParams.get("filter") || "all";
  function handleClick(value: string) {
    searchParams.set("filter", value);
    setSearchParams(searchParams);
  }
  return (
    <div className="border border-gray-300 shadow-sm  rounded-lg p-2 flex gap-1 ">
      <button
        onClick={() => handleClick("all")}
        className={`active:bg-sky-500 active:text-white px-2  rounded-md ${
          filteredValue === "all" ? "bg-sky-500 text-white" : ""
        }`}
      >
        All
      </button>
      <button
        onClick={() => handleClick("with-discount")}
        className={`active:bg-sky-500 active:text-white px-2  rounded-md ${
          filteredValue === "with-discount" ? "bg-sky-500 text-white" : ""
        }`}
      >
        Discount
      </button>
      <button
        onClick={() => handleClick("no-discount")}
        className={`active:bg-sky-500 active:text-white px-2  rounded-md ${
          filteredValue === "no-discount" ? "bg-sky-500 text-white" : ""
        }`}
      >
        No Discount
      </button>
    </div>
  );
}
