import React, { useEffect } from "react";
import Table from "../../ui/Tabel";
import { HiCheckCircle, HiEllipsisVertical, HiXCircle } from "react-icons/hi2";
import { useEmployees } from "./useEmployees";
import EmployeesRow from "./EmployeesRow";
import { EmployeesType } from "../../Types/types";
import Spinner from "../../ui/Spinner";
import { useUser } from "../authentication/useUser";

export default function EmployeesTable() {
  const { user } = useUser();
  const { isLoading, employees } = useEmployees();

  if (isLoading) return <Spinner />;

  return (
    <div className="border border-gray-200 rounded-md text-gray-600">
      <Table col=" 1fr 1fr 1.6fr 1fr  1fr 1fr 20px">
        <Table.Header>
          <div>Id</div>
          <div>name</div>
          <div>email</div>
          <div>Phone number</div>
          <div>role</div>
          <div>status</div>
        </Table.Header>
        <div>
          {employees?.map((employee: EmployeesType) => (
            <EmployeesRow key={employee.id} employee={employee} />
          ))}
        </div>
      </Table>
    </div>
  );
}
