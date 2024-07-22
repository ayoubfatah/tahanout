import React from "react";
import { OrderStatusTypes } from "../Types/types";
import { HiOutlineArrowUturnLeft } from "react-icons/hi2";
import { useTranslation } from "react-i18next";

interface StatusBadgeProps {
  status: OrderStatusTypes;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const { t } = useTranslation();
  const getStatusStyles = (status: OrderStatusTypes) => {
    switch (status) {
      case "cancelled":
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
    <>
      <div
        className={`flex justify-center items-center gap-1 text-[12px] uppercase py-1 px-2 rounded-full ${getStatusStyles(
          status
        )}`}
      >
        {status === "returned" && (
          <span>
            <HiOutlineArrowUturnLeft />
          </span>
        )}
        <span>{t(status).split("-").join(" ")}</span>
      </div>
    </>
  );
};

export default StatusBadge;
