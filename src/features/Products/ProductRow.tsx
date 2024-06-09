import React from "react";
import { HiEllipsisVertical } from "react-icons/hi2";
import Table from "../../ui/Tabel";

export default function ProductRow({ data }: any) {
  return (
    <Table.Body>
      {" "}
      <div className="flex items-center justify-start">
        {" "}
        <img
          className="object-cover bg-no-repeat bg-center w-[60px] h-[60px]"
          src={data.image}
          alt=""
        />
      </div>
      <span className="">{data.sku}</span>
      <span className="text-[14px]">{data.name}</span>
      <span className="font-[500]">{data.price}$</span>
      <span className="font-[500] ">{data.discount}$</span>
      <span className="font-[500]">{data.quantity}</span>
      <div className="text-[14px]">
        <span className="  ">{data.warehouse}</span>
      </div>
      <div className="flex justify-end ">
        <span className=" cursor-pointer">
          <HiEllipsisVertical size={25} />
        </span>
      </div>
    </Table.Body>
  );
}
