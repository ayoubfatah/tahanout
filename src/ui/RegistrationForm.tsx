import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useSignUp } from "../features/authentication/useSignUp";
import { useCreateEmployees } from "../features/Employees/useCreateEmployees";
import { EmployeesType } from "../Types/types";
import Button from "./Button";
import { useNotificationSound } from "../hooks/useNotificationSound";

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
      return toast.error("Passwords do not match");
    }
    signUp(data, {
      onSuccess: () => {
        toast.success("User created successfully");

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
          Full Name
        </label>
        <input
          disabled={isLoading || customerLoading}
          type="text"
          {...register("fullName", { required: "Full name is required" })}
          className="py-2  px-2 mt-1  dark:bg-gray-800  dark:text-gray-200  block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50"
        />
        {errors.fullName && (
          <span className="text-red-600  text-sm  ">
            {errors.fullName.message}
          </span>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
          Email
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
          <span className="text-red-600  text-sm  ">
            {errors.email.message}
          </span>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
          Phone Number
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
          <span className="text-red-600  text-sm  ">
            {errors.phoneNumber.message}
          </span>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
          Password
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
          <span className="text-red-600  text-sm  ">
            {errors.password.message}
          </span>
        )}
      </div>

      <div className="">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
          Retype Password
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
          <span className="text-red-600  text-sm  ">
            {errors.confirmPassword.message}
          </span>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
          Role
        </label>
        <input
          type="text"
          {...register("role", { required: "Role is required" })}
          className="py-2  px-2 mt-1  dark:bg-gray-800  dark:text-gray-200  block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50"
        />
        {errors.role && (
          <span className="text-red-600  text-sm  ">{errors.role.message}</span>
        )}
      </div>

      <div className="flex gap-3">
        <Button
          type="button"
          onClick={handleSubmit(onSubmit)}
          text="Submit"
          textColor="text-white"
          bgColor="bg-sky-500"
        />
        <Button
          type="button"
          text="Cancel"
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
