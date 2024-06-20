import React from "react";
import { OrderStatusTypes } from "../Types/types";

interface StatusBadgeProps {
  status: OrderStatusTypes;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const getStatusStyles = (status: OrderStatusTypes) => {
    switch (status) {
      case "canceled":
        return "bg-red-200 text-red-600";
      case "in-progress":
        return "bg-blue-200 text-blue-600";
      case "pending":
        return "bg-yellow-200 text-gray-500";
      case "delivered":
        return "bg-green-200 text-green-600";
      case "returned":
        return "bg-gray-200 text-gray-600";
      default:
        return "";
    }
  };

  return (
    <span
      className={`text-[12px] uppercase py-1 px-3 rounded-full ${getStatusStyles(
        status
      )}`}
    >
      {status.split("-").join(" ")}
    </span>
  );
};

export default StatusBadge;
