import React from "react";
import Table from "../../ui/Tabel";
import { formatCurrency, formatDate } from "../../utils/helpers";
import { HiEllipsisVertical } from "react-icons/hi2";
import StatusBadge from "../../ui/StatusBadge";

export default function OrdersRow({ order }: any) {
  return (
    <Table.Row>
      <span className="text-[14px] text-gray-700 ">{order.id} </span>
      <div className="flex flex-col">
        <span className="text-[14px] text-gray-700 ">
          {order.customers.fullName}
        </span>
        <span className="text-[10px] text-gray-700 ">
          {order.customers.email}
        </span>
      </div>
      <span className="text-[14px] text-gray-700 ">{order.products.name}</span>
      <span className="text-[14px] text-gray-700 ">{order.products.sku}</span>
      <span className="text-[14px] text-gray-700 ">
        {" "}
        {formatDate(order.created_at)}
      </span>
      <span className="text-[14px] text-gray-700 ">
        {formatCurrency(order.totalPrice)}
      </span>
      <div>
        {" "}
        <StatusBadge status={order.status} />
      </div>
      <div className="flex justify-end">
        <HiEllipsisVertical size={20} />
      </div>
    </Table.Row>
  );
}