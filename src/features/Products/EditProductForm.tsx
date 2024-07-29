import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Product } from "../../Types/types";
import useUpdateProduct from "./useUpdateProduct";
import { CATEGORIES } from "../../services/Categories";
import { HiOutlineX } from "react-icons/hi";

const ProductForm = ({
  data: product,
  onClose,
}: {
  data: Product;
  onClose: () => void;
}) => {
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      ...product,
      specificationsText: Object.entries(product.specifications || {})
        .map(([key, value]) => `${key}: ${value}`)
        .join("\n"),
    },
  });

  const [offers, setOffers] = useState(
    product.offers || [{ percentage: "", quantity: "" }]
  );

  const { isEditing, mutate } = useUpdateProduct();
  const handleOfferChange = (index: number, field: string, value: string) => {
    const newOffers = [...offers];
    newOffers[index] = { ...newOffers[index], [field]: value };
    setOffers(newOffers);
  };

  const addOffer = () => {
    setOffers([...offers, { percentage: "", quantity: "" }]);
  };

  const removeOffer = (index: number) => {
    const newOffers = offers.filter((_: any, i: any) => i !== index);
    setOffers(newOffers);
  };

  const onSubmit = (data: any) => {
    const specificationsText = data.specificationsText || "";
    const specificationsLines = specificationsText.split("\n");
    const specifications = specificationsLines.reduce((acc: any, line: any) => {
      const [key, value] = line.split(":").map((item: any) => item.trim());
      if (key && value) {
        acc[key] = value;
      }
      return acc;
    }, {});

    delete data.specificationsText;

    mutate(
      {
        newProductData: {
          ...data,
          images: product.images,
          specifications,
          offers,
        },
        id: product.id,
      },
      {
        onSuccess: () => {
          onClose();
        },
      }
    );
  };

  const onCloseForm = () => {
    onClose();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="overflow-y-scroll w-[600px] h-[600px] py-10 px-8 flex flex-col gap-5"
    >
      <div className="flex flex-col gap-2 items-start">
        <label>{t("SKU")}:</label>
        <input
          disabled={isEditing}
          className="rounded-md border border-[#e0e0e0] dark:bg-gray-800 dark:text-gray-200 bg-white py-1 text-base font-medium text-gray-800 outline-none focus:border-[#6A64F1] focus:shadow-md w-full p-1 px-2"
          type="text"
          {...register("sku", { required: t("SKU is required") })}
        />
        {errors.sku && (
          <span className="text-red-500 text-[12px]">{errors.sku.message}</span>
        )}
      </div>

      <div className="flex flex-col gap-2 items-start">
        <label>{t("Name")}:</label>
        <input
          disabled={isEditing}
          className="rounded-md border border-[#e0e0e0] dark:bg-gray-800 dark:text-gray-200 bg-white py-1 text-base font-medium text-gray-800 outline-none focus:border-[#6A64F1] focus:shadow-md w-full p-1 px-2"
          type="text"
          {...register("name", { required: t("Name is required") })}
        />
        {errors.name && (
          <span className="text-red-500 text-[12px]">
            {errors.name.message}
          </span>
        )}
      </div>

      <div className="flex flex-col gap-2 items-start">
        <label>{t("Original Price")}:</label>
        <input
          disabled={isEditing}
          className="rounded-md border border-[#e0e0e0] dark:bg-gray-800 dark:text-gray-200 bg-white py-1 text-base font-medium text-gray-800 outline-none focus:border-[#6A64F1] focus:shadow-md w-full p-1 px-2"
          type="number"
          {...register("originalPrice", {
            required: t("Original Price is required"),
          })}
        />
        {errors.originalPrice && (
          <span className="text-red-500 text-[12px]">
            {errors.originalPrice.message}
          </span>
        )}
      </div>

      <div className="flex flex-col gap-2 items-start">
        <label>{t("Selling Price")}:</label>
        <input
          disabled={isEditing}
          className="rounded-md border border-[#e0e0e0] dark:bg-gray-800 dark:text-gray-200 bg-white py-1 text-base font-medium text-gray-800 outline-none focus:border-[#6A64F1] focus:shadow-md w-full p-1 px-2"
          type="number"
          {...register("price", { required: t("Price is required") })}
        />
        {errors.price && (
          <span className="text-red-500 text-[12px]">
            {errors.price.message}
          </span>
        )}
      </div>

      <div className="flex flex-col gap-2 items-start">
        <label>{t("Discount")}:</label>
        <input
          disabled={isEditing}
          className="rounded-md border border-[#e0e0e0] dark:bg-gray-800 dark:text-gray-200 bg-white py-1 text-base font-medium text-gray-800 outline-none focus:border-[#6A64F1] focus:shadow-md w-full p-1 px-2"
          type="number"
          {...register("discount")}
        />
      </div>
      <div className="flex flex-col gap-2 items-start">
        <label>{t("Offers")}:</label>
        {offers.map((offer: any, index: number) => (
          <div key={index} className="flex gap-2 items-center">
            <input
              className="rounded-md border border-[#e0e0e0] dark:bg-gray-800 dark:text-gray-200 bg-white py-1 text-base font-medium text-gray-800 outline-none focus:border-[#6A64F1] focus:shadow-md p-1 px-2 w-[180px]"
              type="number"
              placeholder={t("Quantity")}
              value={offer.quantity}
              onChange={(e) =>
                handleOfferChange(index, "quantity", e.target.value)
              }
            />
            <input
              className="rounded-md border border-[#e0e0e0] dark:bg-gray-800 dark:text-gray-200 bg-white py-1 text-base font-medium text-gray-800 outline-none focus:border-[#6A64F1] focus:shadow-md p-1 px-2 w-[180px]"
              type="number"
              placeholder={t("Percentage")}
              value={offer.percentage}
              onChange={(e) =>
                handleOfferChange(index, "percentage", e.target.value)
              }
            />
            {index > 0 && (
              <button
                type="button"
                onClick={() => removeOffer(index)}
                className="px-2 py-1 text-red-500 rounded-md"
              >
                <HiOutlineX className="w-5 h-5" />
              </button>
            )}
          </div>
        ))}
        <button
          type="button"
          onClick={addOffer}
          className="text-blue-500 rounded-md self-start text-sm"
        >
          {t("Add More Offers")}
        </button>
      </div>

      <div className="flex gap-2">
        <button
          disabled={isEditing}
          type="submit"
          className="text-white bg-sky-500 px-4 py-2 rounded-md mt-3"
        >
          {t("Edit")}
        </button>

        <button
          disabled={isEditing}
          type="button"
          onClick={onCloseForm}
          className="text-gray-800 bg-white border border-black px-4 py-2 rounded-md mt-3"
        >
          {t("Close")}
        </button>
      </div>

      <div className="flex flex-col gap-2 items-start">
        <label>{t("Quantity")}:</label>
        <input
          disabled={isEditing}
          className="rounded-md border border-[#e0e0e0] dark:bg-gray-800 dark:text-gray-200 bg-white py-1 text-base font-medium text-gray-800 outline-none focus:border-[#6A64F1] focus:shadow-md w-full p-1 px-2"
          type="number"
          {...register("quantity", { required: t("Quantity is required") })}
        />
        {errors.quantity && (
          <span className="text-red-500 text-[12px]">
            {errors.quantity.message}
          </span>
        )}
      </div>

      <div className="flex flex-col gap-2 items-start">
        <label>{t("Description")}:</label>
        <textarea
          className=" rounded-md border border-[#e0e0e0] dark:bg-gray-800 dark:text-gray-200 bg-white py-1 text-base font-medium text-gray-800 outline-none focus:border-[#6A64F1] focus:shadow-md w-full p-1 px-2"
          {...register("description", {
            required: t("Description is required"),
          })}
        />
        {errors.description && (
          <span className="text-red-500 text-[12px]">
            {errors.description.message}
          </span>
        )}
      </div>
      <div className="flex flex-col gap-2 items-start">
        <label>{t("Specifications")}:</label>
        <textarea
          className=" rounded-md border border-[#e0e0e0] dark:bg-gray-800 dark:text-gray-200 bg-white py-1 text-base font-medium text-gray-800 outline-none focus:border-[#6A64F1] focus:shadow-md w-full p-1 px-2"
          placeholder="switchType: Razer Green..."
          {...register("specificationsText")}
        />
      </div>

      <div className="flex flex-col gap-2 items-start">
        <label>{t("Min Order")}:</label>
        <input
          disabled={isEditing}
          className="rounded-md border border-[#e0e0e0] dark:bg-gray-800 dark:text-gray-200 bg-white py-1 text-base font-medium text-gray-800 outline-none focus:border-[#6A64F1] focus:shadow-md w-full p-1 px-2"
          type="number"
          {...register("minOrder", {
            required: t("Min order is required"),
            min: { value: 0, message: t("Min order must be at least 0") },
          })}
        />
      </div>

      <div className="flex flex-col gap-2 items-start">
        <label>{t("Category")}:</label>
        <select
          className="rounded-md border border-[#e0e0e0] dark:bg-gray-800 dark:text-gray-200 bg-white py-1 text-base font-medium text-gray-800 outline-none focus:border-[#6A64F1] focus:shadow-md w-full p-1 px-2"
          {...register("category", { required: t("Category is required") })}
        >
          {CATEGORIES.map((category, i) => (
            <option key={i} value={category}>
              {category}
            </option>
          ))}
        </select>
        {errors.category && (
          <span className="text-red-500 text-[12px]">
            {errors.category.message}
          </span>
        )}
      </div>

      <div className="flex flex-col gap-2 items-start">
        <label>{t("Warehouse")}:</label>
        <input
          disabled={isEditing}
          className="rounded-md border border-[#e0e0e0] dark:bg-gray-800 dark:text-gray-200 bg-white py-1 text-base font-medium text-gray-800 outline-none focus:border-[#6A64F1] focus:shadow-md w-full p-1 px-2"
          type="text"
          {...register("warehouse", { required: t("Warehouse is required") })}
        />
        {errors.warehouse && (
          <span className="text-red-500 text-[12px]">
            {errors.warehouse.message}
          </span>
        )}
      </div>

      <div className="flex flex-col gap-2 items-start">
        <label>{t("Colors")}:</label>
        <input
          disabled={isEditing}
          className="rounded-md border border-[#e0e0e0] dark:bg-gray-800 dark:text-gray-200 bg-white py-1 text-base font-medium text-gray-800 outline-none focus:border-[#6A64F1] focus:shadow-md w-full p-1 px-2"
          type="text"
          {...register("colors")}
        />
      </div>

      <div className="flex flex-col gap-2 items-start">
        <label>{t("Brand")}:</label>
        <input
          disabled={isEditing}
          className="rounded-md border border-[#e0e0e0] dark:bg-gray-800 dark:text-gray-200 bg-white py-1 text-base font-medium text-gray-800 outline-none focus:border-[#6A64F1] focus:shadow-md w-full p-1 px-2"
          type="text"
          {...register("brand")}
        />
      </div>

      <div className="flex flex-col gap-2 items-start">
        <label>{t("Weight")}:</label>
        <input
          disabled={isEditing}
          className="rounded-md border border-[#e0e0e0] dark:bg-gray-800 dark:text-gray-200 bg-white py-1 text-base font-medium text-gray-800 outline-none focus:border-[#6A64F1] focus:shadow-md w-full p-1 px-2"
          type="number"
          {...register("weight", {
            required: t("Weight is required"),
            min: { value: 0, message: t("Weight must be at least 0") },
          })}
        />
        {errors.weight && (
          <span className="text-red-500 text-[12px]">
            {errors.weight.message}
          </span>
        )}
      </div>

      <div className="flex gap-2">
        <button
          disabled={isEditing}
          type="submit"
          className="text-white bg-sky-500 px-4 py-2 rounded-md mt-3"
        >
          {t("Edit")}
        </button>

        <button
          disabled={isEditing}
          type="button"
          onClick={onCloseForm}
          className="text-gray-800 bg-white border border-black px-4 py-2 rounded-md mt-3"
        >
          {t("Close")}
        </button>
      </div>
    </form>
  );
};

export default ProductForm;
