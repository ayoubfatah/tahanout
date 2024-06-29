import React from "react";

export default function OrderCustomerOptionsRow({
  item,
  handleSelect,
  fromCustomerTable,
}: any) {
  return (
    <div
      key={item.id}
      className=" py-3 flex justify-between hover:bg-gray-50  cursor-pointer"
      onClick={() => {
        if (fromCustomerTable) return null;
        handleSelect(item);
      }}
    >
      <div>
        <div className="px-4">{item.fullName}</div>
        <div className="px-4 text-[10px]">{item.email}</div>
      </div>
      <div className="flex w-1/2  flex-col justify-end text-end">
        <div className="px-4 text-[12px]">{item.city}</div>
        <div className="px-4 text-[10px]">{item.zipCode}</div>
      </div>
    </div>
  );
}
