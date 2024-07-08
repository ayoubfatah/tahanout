import { useForm } from "react-hook-form";
import { CustomersType } from "../../Types/types";
import useAddCustomer from "./useAddCustomer";
import toast from "react-hot-toast";
import { useNotificationSound } from "../../hooks/useNotificationSound";

type CustomerFormProps = {
  onClose: () => void;
  onSubmit: (data: CustomersType) => void;
};

const CustomerForm = ({ onClose }: CustomerFormProps) => {
  const { isLoading, addCustomerFun } = useAddCustomer();
  const playNotificationSound = useNotificationSound();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CustomersType>();

  const handleFormSubmit = (data: CustomersType) => {
    addCustomerFun(data, {
      onSuccess: () => {
        playNotificationSound();
        toast.success("Customer created successfully");
        onClose();
      },
    });
    reset();
  };

  return (
    <div className="overflow-y-scroll min-w-[500px] max-h-[500px]">
      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        className="mx-auto w-full flex flex-col gap-4 p-10"
      >
        <div className="flex flex-col gap-2">
          <label>Full Name:</label>
          <input
            className="rounded-md border border-[#e0e0e0] bg-white py-1 text-base font-medium   text-gray-800    outline-none focus:border-[#6A64F1] focus:shadow-md w-full p-1 px-2"
            type="text"
            {...register("fullName", { required: "Full Name is required" })}
          />
          {errors.fullName && (
            <span className="text-red-500 text-[12px]">
              {errors.fullName.message}
            </span>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label>Email:</label>
          <input
            className="rounded-md border border-[#e0e0e0] bg-white py-1 text-base font-medium   text-gray-800    outline-none focus:border-[#6A64F1] focus:shadow-md w-full p-1 px-2"
            type="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                message: "Invalid email address",
              },
            })}
          />
          {errors.email && (
            <span className="text-red-500 text-[12px]">
              {errors.email.message}
            </span>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label>Phone Number:</label>
          <input
            className="rounded-md border border-[#e0e0e0] bg-white py-1 text-base font-medium   text-gray-800    outline-none focus:border-[#6A64F1] focus:shadow-md w-full p-1 px-2"
            type="text"
            {...register("phoneNumber", {
              required: "Phone Number is required",
            })}
          />
          {errors.phoneNumber && (
            <span className="text-red-500 text-[12px]">
              {errors.phoneNumber.message}
            </span>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label>national ID:</label>
          <input
            className="rounded-md border border-[#e0e0e0] bg-white py-1 text-base font-medium   text-gray-800    outline-none focus:border-[#6A64F1] focus:shadow-md w-full p-1 px-2"
            type="text"
            {...register("nationalId", { required: "nationalId is required" })}
          />
          {errors.country && (
            <span className="text-red-500 text-[12px]">
              {errors.country.message}
            </span>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <label>Country:</label>
          <input
            className="rounded-md border border-[#e0e0e0] bg-white py-1 text-base font-medium   text-gray-800    outline-none focus:border-[#6A64F1] focus:shadow-md w-full p-1 px-2"
            type="text"
            {...register("country", { required: "Country is required" })}
          />
          {errors.country && (
            <span className="text-red-500 text-[12px]">
              {errors.country.message}
            </span>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label>City:</label>
          <input
            className="rounded-md border border-[#e0e0e0] bg-white py-1 text-base font-medium   text-gray-800    outline-none focus:border-[#6A64F1] focus:shadow-md w-full p-1 px-2"
            type="text"
            {...register("city", { required: "City is required" })}
          />
          {errors.city && (
            <span className="text-red-500 text-[12px]">
              {errors.city.message}
            </span>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label>Zip Code:</label>
          <input
            className="rounded-md border border-[#e0e0e0] bg-white py-1 text-base font-medium   text-gray-800    outline-none focus:border-[#6A64F1] focus:shadow-md w-full p-1 px-2"
            type="text"
            {...register("zipCode", { required: "Zip Code is required" })}
          />
          {errors.zipCode && (
            <span className="text-red-500 text-[12px]">
              {errors.zipCode.message}
            </span>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label>Address:</label>
          <textarea
            className="rounded-md border border-[#e0e0e0] bg-white py-1 text-base font-medium   text-gray-800    outline-none focus:border-[#6A64F1] focus:shadow-md w-full p-1 px-2"
            {...register("address", { required: "Address is required" })}
          />
          {errors.address && (
            <span className="text-red-500 text-[12px]">
              {errors.address.message}
            </span>
          )}
        </div>

        <div className="flex gap-2">
          <button
            disabled={isLoading}
            className="text-white bg-sky-500 px-4 py-2 rounded-md mt-3"
          >
            Save Customer
          </button>
          <button
            type="button"
            onClick={onClose}
            className="  text-gray-800    bg-white border border-black px-4 py-2 rounded-md mt-3"
          >
            Close
          </button>
        </div>
      </form>
    </div>
  );
};

export default CustomerForm;
