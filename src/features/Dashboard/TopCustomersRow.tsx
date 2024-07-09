import React from "react";
import { formatCurrency } from "../../utils/helpers";

export default function TopCustomersRow({ customer, i }: any) {
  return (
    <div
      key={customer.customerId}
      className="grid grid-cols-[20px_1fr_1fr_1fr_1fr] gap-4 items-center hover:bg-gray-100 border-dashed border-gray-400 border-b py-1"
    >
      <span className="text-gray-600 text-[12px]">{i + 1}#</span>
      <div className="flex flex-col text-[12px]">
        <span className="text-gray-400">Full Name</span>
        <span className="text-gray-600">{customer.fullName}</span>
      </div>
      <div className="flex flex-col text-[12px]">
        <span className="text-gray-400">City</span>
        <span className="text-gray-500">{customer.city}</span>
      </div>
      <div className="flex flex-col text-[12px]">
        <span className="text-gray-400">Orders</span>
        <span className="text-gray-500">{customer?.totalOrders}</span>
      </div>
      <div className="flex flex-col text-[12px]">
        <span className="text-gray-400">Money Spent</span>
        <span className="text-blue-500">
          {formatCurrency(customer?.totalSpent)}
        </span>
      </div>
    </div>
  );
}
