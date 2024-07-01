import React from "react";
import Filter from "../../ui/Filter";
import SearchInput from "../../ui/SearchInput";

export default function ProductTablesOperations({
  setFilteredProducts,
  products,
}: any) {
  return (
    <div className="flex justify-between items-center  ">
      <SearchInput
        items={products}
        filterKeys={["sku", "name", "warehouse"]}
        onFilter={setFilteredProducts}
      />
      <Filter />
    </div>
  );
}
