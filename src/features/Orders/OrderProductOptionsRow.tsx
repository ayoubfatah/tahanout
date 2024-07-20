import React from "react";
import { formatCurrency } from "../../utils/helpers";

export default function OrderProductOptionsRow({
  item,
  handleSelect,

  fromProductTable,
}: any) {
  if (item?.quantity === 0) {
    return null;
  }
  return (
    <div
      className="py-3 grid gap-2 grid-cols-[60px_1fr_1fr_1fr] justify-around items-center hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer"
      onClick={() => {
        if (fromProductTable) return null;
        handleSelect(item);
      }}
    >
      <img src={item.images[0]} className="object-fill h-12" alt="" />
      <div>{item.name}</div>
      <div className="text-green-500">{formatCurrency(item.price)}</div>
      <div>{item.warehouse}</div>
    </div>
  );
}
