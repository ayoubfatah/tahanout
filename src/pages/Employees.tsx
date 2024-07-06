import React, { useState } from "react";
import { HiCheckCircle, HiXCircle, HiPlus } from "react-icons/hi";
import EmployeesTable from "../features/Employees/EmployeesTable";
import RegistrationForm from "../ui/RegistrationForm";
import Button from "../ui/Button";
import Modal from "../ui/Modal";

export default function Employees() {
  return (
    <>
      <Modal>
        <div className="flex flex-col justify-between gap-10 ">
          <h1 className="text-[24px] font-semibold">Employees</h1>
          <div className="flex flex-col gap-4">
            <EmployeesTable />
            <Modal.Open opens="addEmployee">
              <Button
                text="Add Employee"
                textColor="text-white"
                icon={<HiPlus color="white" />}
                onClick={() => {}}
                bgColor="bg-sky-500"
              />
            </Modal.Open>
            <Modal.Window name="addEmployee">
              <RegistrationForm />
            </Modal.Window>
          </div>
        </div>
      </Modal>
    </>
  );
}
