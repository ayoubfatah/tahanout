import React from "react";
import { formatCurrency } from "../../utils/helpers";

export default function ProductOptionsRow(
  { item }: any,
  { handleSelect }: any
) {
  return (
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
  );
}
