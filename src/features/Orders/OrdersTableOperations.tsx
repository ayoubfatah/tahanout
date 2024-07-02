import React from "react";
import SortBy from "../../ui/SortBy";
import SearchInput from "../../ui/SearchInput";

export default function OrdersTableOperations({
  orders,
  setFilteredOrders,
}: any) {
  return (
    <div className="flex justify-between items-center  ">
      <SearchInput items={orders} onFilter={setFilteredOrders} order={true} />

      <SortBy
        options={[
          { value: "createdAt-asc", label: "Sort by date (Newest first)" },
          { value: "createdAt-desc", label: "Sort by date (Oldest first)" },
          { value: "totalprice-asc", label: "Sort by price (low first)" },
          { value: "totalprice-desc", label: "Sort by price (high first)" },
          { value: "quantity-asc", label: "Sort by quantity (low first)" },
          { value: "quantity-desc", label: "Sort by quantity (high first)" },
        ]}
      />
    </div>
  );
}
