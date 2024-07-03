import React, { useState } from "react";
import { HiCheckCircle, HiXCircle, HiPlus } from "react-icons/hi";
import EmployeesTable from "../features/Employees/EmployeesTable";

export default function Employees() {
  return (
    <>
      <div className="flex flex-col justify-between gap-10 ">
        <h1 className="text-[24px] font-semibold">Employees</h1>
        <EmployeesTable />
      </div>
    </>
  );
}
