import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { CustomersType } from "../../Types/types";
import useAddCustomer from "./useAddCustomer";
import toast from "react-hot-toast";
import { useNotificationSound } from "../../hooks/useNotificationSound";
import { moroccanRegionsAndCities } from "../../services/moroccanRegionsAndCities";
import { useTranslation } from "react-i18next";

type CustomerFormProps = {
  onClose: () => void;
  onSubmit: (data: CustomersType) => void;
};

const CustomerForm = ({ onClose }: CustomerFormProps) => {
  const { t } = useTranslation();
  const { isLoading, addCustomerFun } = useAddCustomer();
  const [cities, setCities] = useState<string[]>([]);
  const playNotificationSound = useNotificationSound();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<CustomersType>();

  const watchRegion = watch("region");

  useEffect(() => {
    if (watchRegion) {
      const selectedRegion = moroccanRegionsAndCities.regions.find(
        (region) => region.name === watchRegion
      );
      setCities(selectedRegion ? selectedRegion.cities : []);
    }
  }, [watchRegion]);

  const handleFormSubmit = (data: CustomersType) => {
    addCustomerFun(data, {
      onSuccess: () => {
        playNotificationSound();
        toast.success(t("customerCreated"));
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
          <label>{t("fullName")}:</label>
          <input
            className="rounded-md border border-[#e0e0e0] dark:bg-gray-800 dark:text-gray-200 bg-white py-1 text-base font-medium text-gray-800 outline-none focus:border-[#6A64F1] focus:shadow-md w-full p-1 px-2"
            type="text"
            {...register("fullName", { required: t("fullNameRequired") })}
          />
          {errors.fullName && (
            <span className="text-red-500 text-[12px]">
              {errors.fullName.message}
            </span>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label>{t("email")}:</label>
          <input
            className="rounded-md border border-[#e0e0e0] dark:bg-gray-800 dark:text-gray-200 bg-white py-1 text-base font-medium text-gray-800 outline-none focus:border-[#6A64F1] focus:shadow-md w-full p-1 px-2"
            type="email"
            {...register("email", {
              required: t("emailRequired"),
              pattern: {
                value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                message: t("invalidEmail"),
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
          <label>{t("phoneNumber")}:</label>
          <input
            className="rounded-md border border-[#e0e0e0] dark:bg-gray-800 dark:text-gray-200 bg-white py-1 text-base font-medium text-gray-800 outline-none focus:border-[#6A64F1] focus:shadow-md w-full p-1 px-2"
            type="text"
            {...register("phoneNumber", { required: t("phoneNumberRequired") })}
          />
          {errors.phoneNumber && (
            <span className="text-red-500 text-[12px]">
              {errors.phoneNumber.message}
            </span>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label>{t("nationalId")}:</label>
          <input
            className="rounded-md border border-[#e0e0e0] dark:bg-gray-800 dark:text-gray-200 bg-white py-1 text-base font-medium text-gray-800 outline-none focus:border-[#6A64F1] focus:shadow-md w-full p-1 px-2"
            type="text"
            {...register("nationalId", { required: t("nationalIdRequired") })}
          />
          {errors.nationalId && (
            <span className="text-red-500 text-[12px]">
              {errors.nationalId.message}
            </span>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label>{t("country")}:</label>
          <input
            className="rounded-md border border-[#e0e0e0] dark:bg-gray-800 dark:text-gray-200 bg-white py-1 text-base font-medium text-gray-800 outline-none focus:border-[#6A64F1] focus:shadow-md w-full p-1 px-2"
            type="text"
            {...register("country", { required: t("countryRequired") })}
          />
          {errors.country && (
            <span className="text-red-500 text-[12px]">
              {errors.country.message}
            </span>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label>{t("region")}:</label>
          <select
            className="rounded-md border border-[#e0e0e0] dark:bg-gray-800 dark:text-gray-200 bg-white py-1 text-base font-medium text-gray-800 outline-none focus:border-[#6A64F1] focus:shadow-md w-full p-1 px-2"
            {...register("region", { required: t("regionRequired") })}
          >
            <option value="">{t("selectRegion")}</option>
            {moroccanRegionsAndCities.regions.map((region) => (
              <option key={region.name} value={region.name}>
                {region.name}
              </option>
            ))}
          </select>
          {errors.region && (
            <span className="text-red-500 text-[12px]">
              {errors.region.message}
            </span>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label>{t("city")}:</label>
          <select
            className="rounded-md border border-[#e0e0e0] dark:bg-gray-800 dark:text-gray-200 bg-white py-1 text-base font-medium text-gray-800 outline-none focus:border-[#6A64F1] focus:shadow-md w-full p-1 px-2"
            {...register("city", { required: t("cityRequired") })}
          >
            <option value="">{t("selectCity")}</option>
            {cities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
          {errors.city && (
            <span className="text-red-500 text-[12px]">
              {errors.city.message}
            </span>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label>{t("zipCode")}:</label>
          <input
            className="rounded-md border border-[#e0e0e0] dark:bg-gray-800 dark:text-gray-200 bg-white py-1 text-base font-medium text-gray-800 outline-none focus:border-[#6A64F1] focus:shadow-md w-full p-1 px-2"
            type="text"
            {...register("zipCode", { required: t("zipCodeRequired") })}
          />
          {errors.zipCode && (
            <span className="text-red-500 text-[12px]">
              {errors.zipCode.message}
            </span>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label>{t("address")}:</label>
          <textarea
            className="rounded-md border border-[#e0e0e0] dark:bg-gray-800 dark:text-gray-200 bg-white py-1 text-base font-medium text-gray-800 outline-none focus:border-[#6A64F1] focus:shadow-md w-full p-1 px-2"
            {...register("address", { required: t("addressRequired") })}
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
            {t("saveCustomer")}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-800 bg-white border border-black px-4 py-2 rounded-md mt-3"
          >
            {t("close")}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CustomerForm;
