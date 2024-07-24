import React from "react";
import { useTranslation } from "react-i18next";
import Filter from "../../ui/Filter";
import SearchInput from "../../ui/SearchInput";
import SortBy from "../../ui/SortBy";

export default function ProductTablesOperations({
  setFilteredProducts,
  products,
}: any) {
  const { t } = useTranslation();

  return (
    <div className="flex justify-between items-center">
      <SearchInput
        items={products}
        filterKeys={["sku", "name", "warehouse"]}
        onFilter={setFilteredProducts}
      />
      <div className="flex items-center gap-3">
        <Filter
          filterField={"discount"}
          options={[
            { label: t("All"), value: "all" },
            { label: t("Discount"), value: "with-discount" },
            { label: t("No Discount"), value: "no-discount" },
          ]}
        />
        <SortBy
          options={[
            {
              value: "createdAt-desc",
              label: t("Sort by date (Newest first)"),
            },
            { value: "createdAt-asc", label: t("Sort by date (oldest first)") },
            { value: "name-asc", label: t("Sort by name (A-Z)") },
            { value: "name-desc", label: t("Sort by name (Z-A)") },
            { value: "price-asc", label: t("Sort by price (low first)") },
            { value: "price-desc", label: t("Sort by price (high first)") },
            { value: "quantity-asc", label: t("Sort by quantity (low first)") },
            {
              value: "quantity-desc",
              label: t("Sort by quantity (high first)"),
            },
          ]}
        />
      </div>
    </div>
  );
}
