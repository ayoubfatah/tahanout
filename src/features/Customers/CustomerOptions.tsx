import React from "react";
import { CustomersType } from "../../Types/types";

export default function CustomerOptions({
  handleSelect,
  setSearchTerm,
  searchTerm,
  isLoading,
  data,
}: any) {
  const filteredData = data.filter((item: CustomersType) =>
    item.fullName.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <div className="absolute mt-2 w-full bg-white border border-gray-200 rounded shadow-lg z-10">
      <div className="p-2">
        <input
          type="text"
          placeholder="Search by Name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-3 py-2 border rounded"
        />
      </div>
      {isLoading ? (
        <div className="p-2">Loading...</div>
      ) : (
        filteredData.map((item: any) => (
          <div
            key={item.id}
            className="testingXd flex py-3 hover:bg-gray-200 flex-col items-start cursor-pointer"
            onClick={() => handleSelect(item)}
          >
            <div className="px-4">{item.fullName}</div>
            <div className="px-4 text-[10px]">{item.email}</div>
          </div>
        ))
      )}
    </div>
  );
}
