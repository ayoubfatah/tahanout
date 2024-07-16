import React from "react";
import { formatCurrency } from "../../utils/helpers";
import { HiEye } from "react-icons/hi2";
import Modal from "../../ui/Modal";
import CustomerInfo from "../Customers/CustomerInfo";

export default function TopCustomersRow({ customer, customerData, i }: any) {
  console.log(customer);
  return (
    <div
      key={customer.customerId}
      className="p-5 grid grid-cols-[20px_1fr_1fr_1fr_1fr_20px] gap-3 items-center hover:bg-gray-100 border-dashed border-gray-400 border-b py-1"
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

      <Modal>
        <Modal.Open opens={"customerInfo"}>
          <span className="text-sky-500 flex justify-end cursor-pointer">
            {" "}
            <HiEye />{" "}
          </span>
        </Modal.Open>
        <Modal.Window name="customerInfo">
          <CustomerInfo data={customerData[0]} />
        </Modal.Window>
      </Modal>
    </div>
  );
}
