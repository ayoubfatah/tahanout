import React, { useEffect } from "react";
import Table from "../../ui/Tabel";
import { HiCheckCircle, HiEllipsisVertical, HiXCircle } from "react-icons/hi2";
import { useEmployees } from "./useEmployees";
import EmployeesRow from "./EmployeesRow";
import { EmployeesType } from "../../Types/types";
import Spinner from "../../ui/Spinner";
import { useUser } from "../authentication/useUser";

export default function EmployeesTable() {
  const { isLoading, employees } = useEmployees();
  const filteredEmployees = employees?.sort(
    (a: any, b: any) =>
      new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
  );

  if (isLoading) return <Spinner />;

  return (
    <div className="border border-gray-200  dark:border-gray-700  dark:text-gray-200  rounded-md text-gray-600">
      <Table col=" 1fr 1fr 1.6fr 1fr  1fr 20px">
        <Table.Header>
          <div>Id</div>
          <div>name</div>
          <div>email</div>
          <div>Phone number</div>
          <div>role</div>
        </Table.Header>
        <div>
          {filteredEmployees?.map((employee: EmployeesType) => (
            <EmployeesRow key={employee.id} employee={employee} />
          ))}
        </div>
      </Table>
    </div>
  );
}
