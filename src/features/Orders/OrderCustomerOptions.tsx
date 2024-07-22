import React from "react";
import { CustomersType } from "../../Types/types";
import CustomerOptionsRow from "./OrderCustomerOptionsRow";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();
  return (
    <div className="absolute mt-2 w-full  max-h-[290px]  overflow-y-scroll    bg-white  dark:bg-gray-800  border border-gray-200 dark:border-gray-700 rounded shadow-lg z-10">
      <div className="p-2">
        <input
          type="text"
          placeholder={t("Search by Name")}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-3 py-2 border rounded dark:bg-gray-700 "
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
