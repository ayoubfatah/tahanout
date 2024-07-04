import React from "react";
import Table from "../../ui/Tabel";
import { HiCheckCircle, HiEllipsisVertical, HiXCircle } from "react-icons/hi2";

const initialEmployees = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    role: "Admin",
    avatar: "https://i.pravatar.cc/150?img=1",
    isOnline: true,
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane.smith@example.com",
    role: "Editor",
    avatar: "https://i.pravatar.cc/150?img=2",
    isOnline: false,
  },
  {
    id: 3,
    name: "Mike Johnson",
    email: "mike.johnson@example.com",
    role: "Moderator",
    avatar: "https://i.pravatar.cc/150?img=3",
    isOnline: true,
  },
  {
    id: 4,
    name: "Emily Davis",
    email: "emily.davis@example.com",
    role: "User",
    avatar: "https://i.pravatar.cc/150?img=4",
    isOnline: false,
  },
];

export default function EmployeesTable() {
  return (
    <div className="border border-gray-200 rounded-md text-gray-600">
      <Table col="100px   1fr 2fr  1fr 1fr 20px">
        <Table.Header>
          <div>avatar</div>
          <div>name</div>
          <div>email</div>
          <div>role</div>
          <div>status</div>
        </Table.Header>
        {initialEmployees.map((employee) => (
          <Table.Row key={employee.id}>
            <img
              src={employee.avatar}
              alt="avatar"
              className="w-10 h-10 object-cover rounded-full"
            />
            <span className=" text-sm text-gray-700">{employee.name}</span>
            <span className="text-sm text-gray-700">{employee.email}</span>
            <span className=" text-sm text-gray-700"> {employee.role}</span>
            <span className=" text-sm ">
              {employee.isOnline ? (
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
        ))}
      </Table>
    </div>
  );
}
