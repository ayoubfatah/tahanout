import React, { useEffect } from "react";
import Table from "../../ui/Tabel";
import { EmployeesType } from "../../Types/types";
import {
  HiCheckCircle,
  HiEllipsisVertical,
  HiEye,
  HiPencil,
  HiTrash,
  HiXCircle,
} from "react-icons/hi2";
import { useUser } from "../authentication/useUser";
import Actions from "../../ui/Actions";

type EmployeeProp = {
  employee: EmployeesType;
};
export default function EmployeesRow({ employee }: EmployeeProp) {
  const { user } = useUser();
  let isOnline = employee.status === "online";

  // useEffect(() => {
  //   if (user?.email === employee.email) {
  //     isOnline = true;
  //   }
  // }, [user?.email, employee.email]);

  return (
    <Table.Row key={employee.id}>
      <span className=" text-sm text-gray-700">{employee.id}</span>
      <span className=" text-sm text-gray-700">{employee.fullName}</span>
      <span className="text-sm text-gray-700">{employee.email}</span>
      <span className="text-sm text-gray-700">{employee.phoneNumber}</span>
      <span
        className={`text-sm ${
          employee.role === "owner" ? "text-yellow-400" : "text-green-500"
        } `}
      >
        {" "}
        {employee.role}
      </span>
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
        <Actions>
          <Actions.Toggle />
          <Actions.Menu>
            <Actions.Item
              onClick={() => {
                alert(employee.id);
              }}
            >
              <HiPencil size={20} /> Edit
            </Actions.Item>
            <Actions.Item onClick={() => {}}>
              <HiTrash size={20} /> Delete
            </Actions.Item>
          </Actions.Menu>
        </Actions>
      </span>
    </Table.Row>
  );
}
