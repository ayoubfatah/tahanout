import React from "react";
import Filter from "../../ui/Filter";
import SearchInput from "../../ui/SearchInput";
import SortBy from "../../ui/SortBy";

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
      <div className="flex items-center gap-3">
        <Filter
          filterField={"discount"}
          options={[
            { label: "All", value: "all" },
            { label: "Discount", value: "with-discount" },
            { label: "No Discount", value: "no-discount" },
          ]}
        />
        <SortBy
          options={[
            { value: "createdAt-desc", label: "Sort by date (Newest first)" },
            { value: "createdAt-asc", label: "Sort by date (oldest first)" },
            { value: "name-asc", label: "Sort by name (A-Z)" },
            { value: "name-desc", label: "Sort by name (Z-A)" },
            { value: "price-asc", label: "Sort by price (low first)" },
            { value: "price-desc", label: "Sort by price (high first)" },
            { value: "quantity-asc", label: "Sort by quantity (low first)" },
            { value: "quantity-desc", label: "Sort by quantity (high first)" },
          ]}
        />
      </div>
    </div>
  );
}
