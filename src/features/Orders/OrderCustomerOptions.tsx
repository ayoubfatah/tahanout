import React from "react";
import { CustomersType } from "../../Types/types";
import CustomerOptionsRow from "./OrderCustomerOptionsRow";

export default function OrdercustomerOptions({
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
    <div className="absolute mt-2 w-full  max-h-[290px]  overflow-y-scroll    bg-white border border-gray-200 rounded shadow-lg z-10">
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
          <CustomerOptionsRow
            key={item.id}
            item={item}
            handleSelect={handleSelect}
          />
        ))
      )}
    </div>
  );
}
