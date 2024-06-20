import React from "react";
import { CustomersType, Product } from "../../Types/types";
import { formatCurrency } from "../../utils/helpers";

export default function CustomerOptions({
  handleSelect,
  setSearchTerm,
  searchTerm,
  isLoading,
  data,
}: any) {
  const filteredData = data.filter((item: Product) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <div className="absolute mt-2 w-full overflow-y-scroll max-h-[290px]  bg-white border border-gray-200 rounded shadow-lg z-10">
      <div className="p-2">
        <input
          type="text"
          placeholder="Search by Name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-3 py-2 border rounded"
        />
      </div>
      {filteredData && (
        <div className=" sticky top-0 bg-white grid gap-2 grid-cols-[60px_1fr_1fr_1fr]    justify-around items-center text-gray-500 text-[10px] ">
          <div></div>
          <div className="">name</div>
          <div>price</div>
          <div>warehouse</div>{" "}
        </div>
      )}
      {filteredData.length === 0 && (
        <div className="p-2 py-3 ">No products found</div>
      )}
      {filteredData.map((item: any) => (
        <div
          key={item.id}
          className=" py-3  grid gap-2 grid-cols-[60px_1fr_1fr_1fr]   justify-around items-center  hover:bg-gray-200 cursor-pointer"
          onClick={() => handleSelect(item)}
        >
          <img src={item.image} className="  object-fill h-12 " alt="" />
          <div className=" ">{item.name}</div>
          <div className="   text-green-500">{formatCurrency(item.price)}</div>

          <div className="  ">{item.warehouse}</div>
        </div>
      ))}
    </div>
  );
}
