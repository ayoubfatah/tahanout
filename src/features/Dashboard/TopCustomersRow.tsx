import React from "react";
import { formatCurrency } from "../../utils/helpers";
import { HiEye } from "react-icons/hi2";
import Modal from "../../ui/Modal";
import CustomerInfo from "../Customers/CustomerInfo";
import { useTranslation } from "react-i18next";

export default function TopCustomersRow({ customer, customerData, i }: any) {
  const { t } = useTranslation();

  return (
    <div
      key={customer.customerId}
      className="p-5 grid grid-cols-[20px_1fr_1fr_1fr_1fr_20px] gap-3 items-center hover:bg-gray-100 dark:hover:bg-gray-700 border-dashed border-gray-400 border-b py-1"
    >
      <span className="text-gray-600 dark:text-gray-200 text-[12px]">
        {i + 1}#
      </span>
      <div className="flex flex-col text-[12px]">
        <span className="text-gray-400 dark:text-gray-300">
          {t("Full Name")}
        </span>
        <span className="text-gray-600 dark:text-gray-200">
          {customer.fullName}
        </span>
      </div>
      <div className="flex flex-col text-[12px]">
        <span className="text-gray-400 dark:text-gray-300">{t("City")}</span>
        <span className="text-gray-500 dark:text-gray-200">
          {customer.city}
        </span>
      </div>
      <div className="flex flex-col text-[12px]">
        <span className="text-gray-400 dark:text-gray-300">{t("Orders")}</span>
        <span className="text-gray-500 dark:text-gray-200">
          {customer?.totalOrders}
        </span>
      </div>
      <div className="flex flex-col text-[12px]">
        <span className="text-gray-400 dark:text-gray-300">
          {t("Money Spent")}
        </span>
        <span className="text-blue-500">
          {formatCurrency(customer?.totalSpent)}
        </span>
      </div>

      <Modal>
        <Modal.Open opens={"customerInfo"}>
          <span className="text-sky-500 flex justify-end cursor-pointer">
            <HiEye />
          </span>
        </Modal.Open>
        <Modal.Window name="customerInfo">
          <CustomerInfo data={customerData[0]} />
        </Modal.Window>
      </Modal>
    </div>
  );
}
