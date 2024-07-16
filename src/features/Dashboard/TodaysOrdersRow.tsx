import React from "react";
import { formatCurrency, formatTime } from "../../utils/helpers";
import { useNavigate } from "react-router-dom";
import { HiCheck, HiOutlineEye } from "react-icons/hi2";
import StatusBadge from "../../ui/StatusBadge";
import { useChangeOrderStatus } from "../Orders/useChangeOrderStatus";
import toast from "react-hot-toast";
import { useNotificationSound } from "../../hooks/useNotificationSound";
import { useQueryClient } from "@tanstack/react-query";

export default function TodaysOrdersRow({ order }: any) {
  const { changeStatus, isLoading } = useChangeOrderStatus();
  const playNotificationSound = useNotificationSound();
  const queryClient = useQueryClient();
  function handleConfirmed() {
    // Optimistically update the UI
    queryClient.setQueryData(["orders"], (oldData: any) => {
      return oldData.map((oldOrder: any) =>
        oldOrder.id === order.id
          ? { ...oldOrder, status: "in-progress" }
          : oldOrder
      );
    });

    // Perform the actual mutation
    changeStatus(
      { id: order.id, status: "in-progress" },
      {
        onSuccess: () => {
          toast.success("Order confirmed successfully");
          playNotificationSound();
        },
        onError: (error) => {
          // Revert the optimistic update on error
          queryClient.setQueryData(["orders"], (oldData: any) => {
            return oldData.map((oldOrder: any) =>
              oldOrder.id === order.id
                ? { ...oldOrder, status: "pending" }
                : oldOrder
            );
          });
          toast.error("Failed to confirm order");
        },
      }
    );
  }
  const navigate = useNavigate();

  return (
    <div
      key={order.id}
      className=" border-b px-2 hover:bg-gray-100 border-gray-200  py-1.5 ma-h-[400px]  grid-cols-[1fr_1.7fr_1.3fr_0.8fr_1fr_1fr_1fr_1.2fr_1fr] grid items-center"
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

      <div className="ml-4">
        <StatusBadge status={order?.status} />
      </div>

      <div className="flex  gap-4 items-center justify-end">
        <button
          disabled={isLoading}
          onClick={() => navigate(`/orders/${order.id}`)}
          className="cursor-pointer  text-blue-400 "
        >
          <HiOutlineEye size={20} />
        </button>
        {order.status === "pending" ? (
          <button
            disabled={isLoading}
            onClick={handleConfirmed}
            className="cursor-pointer  text-green-400 "
          >
            <HiCheck size={20} />
          </button>
        ) : (
          <span className="opacity-0">
            <HiCheck size={20} />
          </span>
        )}
      </div>
    </div>
  );
}
