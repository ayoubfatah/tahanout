import React from "react";
import { formatCurrency, formatTime } from "../../utils/helpers";
import { useNavigate } from "react-router-dom";
import { HiOutlineEye } from "react-icons/hi2";
import StatusBadge from "../../ui/StatusBadge";

export default function TodaysOrdersRow({ order }: any) {
  const navigate = useNavigate();
  return (
    <div
      key={order.id}
      className=" border-b px-2 hover:bg-gray-100 border-gray-200  py-1.5 ma-h-[400px]  grid-cols-[1fr_1.7fr_1.3fr_0.8fr_1fr_1fr_1fr_1fr_1fr] grid items-center"
    >
      <span className="text-[14px] text-gray-700">{order.id}</span>
      <div className="flex flex-col">
        <span className="text-[14px] text-gray-700">
          {order.customers?.fullName}
        </span>
        <span className="text-[10px] text-gray-700">
          {order.customers?.email}
        </span>
      </div>
      <span className="text-[14px] text-gray-700">{order.products?.name}</span>
      <span className="text-[14px] text-gray-700">{order.products?.sku}</span>
      <span className="text-[14px] text-gray-700">
        {order.createdAt ? formatTime(order.createdAt) : "N/A"}
      </span>
      <span className="text-[14px] text-gray-700">{order.quantity}</span>
      <span className="text-[14px] text-blue-500 translate-x-[5px]">
        {formatCurrency(order.totalPrice)}
      </span>
      <div>
        <div>
          <StatusBadge status={order?.status} />
        </div>
      </div>

      <div className="flex justify-end">
        <span
          onClick={() => navigate(`/orders/${order.id}`)}
          className="cursor-pointer  text-cyan-500 "
        >
          <HiOutlineEye size={20} />
        </span>
      </div>
    </div>
  );
}
