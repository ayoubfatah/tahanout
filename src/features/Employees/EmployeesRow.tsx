import React from "react";
import Table from "../../ui/Tabel";
import { EmployeesType } from "../../Types/types";
import { HiCheckCircle, HiEllipsisVertical, HiXCircle } from "react-icons/hi2";

type EmployeeProp = {
  employee: EmployeesType;
};
export default function EmployeesRow({ employee }: EmployeeProp) {
  const isOnline = employee.status === "online";

  const avatar = "https://i.pravatar.cc/150?img=1";
  return (
    <Table.Row key={employee.id}>
      <img
        src={employee.avatar || avatar}
        alt="avatar"
        className="w-10 h-10 object-cover rounded-full"
      />
      <span className=" text-sm text-gray-700">{employee.fullName}</span>
      <span className="text-sm text-gray-700">{employee.email}</span>
      <span className="text-sm text-gray-700">{employee.phoneNumber}</span>
      <span className=" text-sm text-gray-700"> {employee.role}</span>
      <span className=" text-sm ">
        {isOnline ? (
          <span className=" flex gap-1 items-center text-green-500">
            <HiCheckCircle size={16} /> Online{" "}
          </span>
        ) : (
          <span className=" flex gap-1 items-center text-red-500">
            <HiXCircle size={16} /> Offline
          </span>
        )}
      </span>
      <span className=" flex justify-end cursor-pointer ">
        <HiEllipsisVertical size={20} />
      </span>
    </Table.Row>
  );
}
