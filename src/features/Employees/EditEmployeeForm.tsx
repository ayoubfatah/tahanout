import { useState } from "react";

import { EmployeesType } from "../../Types/types";

import Button from "../../ui/Button";
import { useUpdateEmployeeRole } from "./useUpdateRole";
import { useTranslation } from "react-i18next";

const EditEmployeeForm = ({
  employeeData,
  onClose,
}: {
  employeeData: EmployeesType;
  onClose: any;
}) => {
  const [fullName, setFullName] = useState(employeeData.fullName);
  const [email, setEmail] = useState(employeeData.email);
  const [phoneNumber, setPhoneNumber] = useState(employeeData.phoneNumber);
  const [role, setRole] = useState(employeeData.role);
  const { t } = useTranslation();

  //
  //
  //  updating role in employee table

  const { isEditing: isUpdatingRole, mutate: updateEmployee } =
    useUpdateEmployeeRole();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    //
    //
    //
    updateEmployee(
      { newEmployeeRole: role, email: employeeData.email },
      {
        onSuccess: () => {
          onClose();
        },
      }
    );
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 p-10 w-[500px] bg-white dark:bg-gray-800  rounded-md"
    >
      <div>
        <label className="block text-sm font-medium text-gray-700  dark:text-gray-200  ">
          {t("fullName")}
        </label>
        <input
          type="text"
          value={fullName}
          disabled
          className=" cursor-not-allowed py-2 px-2 mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700  dark:text-gray-200  ">
          {t("email")}
        </label>
        <input
          type="email"
          value={email}
          disabled
          className="cursor-not-allowed py-2 px-2 mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700  dark:text-gray-200  ">
          {t("phoneNumber")}
        </label>
        <input
          type="phone"
          value={phoneNumber}
          disabled
          className=" cursor-not-allowed py-2 px-2 mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700  dark:text-gray-200  ">
          {t("Role")}
        </label>
        <input
          disabled={employeeData.role === "owner"}
          type="text"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="dark:bg-gray-800 py-2 px-2 mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50"
        />
      </div>

      <div className="flex gap-3">
        <Button
          onClick={handleSubmit}
          type="submit"
          text={t("Edit")}
          textColor="text-white"
          bgColor="bg-sky-500"
          disabled={isUpdatingRole}
        />
        <Button
          type="button"
          text={t("cancel")}
          textColor="  text-gray-800"
          bgColor="bg-white"
          border="border"
          borderColor="border-black"
          onClick={onClose}
        />
      </div>
    </form>
  );
};

export default EditEmployeeForm;
