import { useTranslation } from "react-i18next";
import { Product } from "../../Types/types";
import ProductOptionsRow from "./OrderProductOptionsRow";

export default function OrderProductOptions({
  handleSelect,
  setSearchTerm,
  searchTerm,
  isLoading,
  data,
}: any) {
  const { t } = useTranslation();
  const filteredData = data.filter((item: Product) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <div className="absolute mt-2 w-full overflow-y-scroll max-h-[290px] dark:bg-gray-800  bg-white border border-gray-200 rounded shadow-lg z-10">
      <div className="p-2">
        <input
          type="text"
          placeholder="Search by Name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full dark:bg-gray-800 px-3 py-2 border rounded"
        />
      </div>
      {filteredData && (
        <div className=" sticky top-0 bg-white dark:bg-gray-800 grid gap-2 grid-cols-[60px_1fr_1fr_1fr]    justify-around items-center text-gray-500 text-[10px] ">
          <div></div>
          <div className="">{t("Name")}</div>
          <div>{t("Price")}</div>
          <div>{t("warehouse")}</div>{" "}
        </div>
      )}
      {filteredData.length === 0 && (
        <div className="p-2 py-3 ">{t("No results found")}</div>
      )}
      {filteredData.map((item: any) => (
        <ProductOptionsRow
          key={item.id}
          item={item}
          handleSelect={handleSelect}
        />
      ))}
    </div>
  );
}
