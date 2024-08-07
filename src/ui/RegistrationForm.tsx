import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useSignUp } from "../features/authentication/useSignUp";
import { useCreateEmployees } from "../features/Employees/useCreateEmployees";
import { EmployeesType } from "../Types/types";
import Button from "./Button";
import { useNotificationSound } from "../hooks/useNotificationSound";
import { useTranslation } from "react-i18next";

type FormValues = {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  phoneNumber: string;
  role: string;
};

const RegistrationForm: React.FC = ({ onClose }: any) => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<FormValues>();
  const { t } = useTranslation();
  const { signUp, isLoading } = useSignUp();
  const playNotificationSound = useNotificationSound();

  const { isLoading: customerLoading, mutate: createEmployee } =
    useCreateEmployees();
  const onSubmit: SubmitHandler<FormValues> = (data) => {
    const employeeData: EmployeesType = {
      id: Math.round(Math.random() * 10000),
      fullName: data.fullName,
      email: data.email,
      phoneNumber: data.phoneNumber,
      role: data.role,
      status: "offline",
    };

    if (data.password !== data.confirmPassword) {
      return toast.error(t("Passwords do not match"));
    }
    signUp(data, {
      onSuccess: () => {
        toast.success(t("Account created successfully"));

        onClose();
      },
    });

    createEmployee(employeeData, {
      onSuccess: () => {
        playNotificationSound();
      },
    });
  };

  const password = watch("password");

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 p-10 w-[500px] bg-white dark:bg-gray-800  dark:text-gray-200 rounded-md"
    >
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
          {t("fullName")}
        </label>
        <input
          disabled={isLoading || customerLoading}
          type="text"
          {...register("fullName", { required: "Full name is required" })}
          className="py-2  px-2 mt-1  dark:bg-gray-800  dark:text-gray-200  block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50"
        />
        {errors.fullName && (
          <span className="text-red-600  text-[10px]  ">
            {t(errors.fullName.message as string)}
          </span>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
          {t("email")}
        </label>
        <input
          disabled={isLoading || customerLoading}
          type="email"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[^@\s]+@[^@\s]+\.[^@\s]+$/,
              message: "Invalid email address",
            },
          })}
          className="py-2  px-2 mt-1  dark:bg-gray-800  dark:text-gray-200  block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50"
        />
        {errors.email && (
          <span className="text-red-600  text-[10px]  ">
            {t(errors.email.message as string)}
          </span>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
          {t("phoneNumber")}
        </label>
        <input
          disabled={isLoading || customerLoading}
          type="phone"
          {...register("phoneNumber", {
            required: "Phone number is required",
          })}
          className="py-2  px-2 mt-1  dark:bg-gray-800  dark:text-gray-200  block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50"
        />
        {errors.phoneNumber && (
          <span className="text-red-600  text-[10px]  ">
            {t(errors.phoneNumber.message as string)}
          </span>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
          {t("password")}
        </label>
        <input
          disabled={isLoading || customerLoading}
          type="password"
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters long",
            },
          })}
          className="py-2  px-2 mt-1  dark:bg-gray-800  dark:text-gray-200  block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50"
        />
        {errors.password && (
          <span className="text-red-600  text-[10px]  ">
            {t(errors.password.message as string)}
          </span>
        )}
      </div>

      <div className="">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
          {t("Retype Password")}
        </label>
        <input
          type="password"
          {...register("confirmPassword", {
            required: "Please confirm your password",
            validate: (value) => value === password || "Passwords do not match",
          })}
          className="py-2  px-2 mt-1  dark:bg-gray-800  dark:text-gray-200  block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50"
        />
        {errors.confirmPassword && (
          <span className="text-red-600  text-[10px]  ">
            {t(errors.confirmPassword.message as string)}
          </span>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
          {t("Role")}
        </label>
        <input
          type="text"
          {...register("role", { required: "Role is required" })}
          className="py-2  px-2 mt-1  dark:bg-gray-800  dark:text-gray-200  block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50"
        />
        {errors.role && (
          <span className="text-red-600  text-[10px]  ">
            {" "}
            {t(errors.role.message as string)}
          </span>
        )}
      </div>

      <div className="flex gap-3">
        <Button
          type="button"
          onClick={handleSubmit(onSubmit)}
          text={t("Submit")}
          textColor="text-white"
          bgColor="bg-sky-500"
        />
        <Button
          type="button"
          text={t("Cancel")}
          textColor="  text-gray-800"
          bgColor="bg-white"
          border="border"
          borderColor="border-black"
          onClick={() => {
            reset();
            onClose();
          }}
        />
      </div>
    </form>
  );
};

export default RegistrationForm;
