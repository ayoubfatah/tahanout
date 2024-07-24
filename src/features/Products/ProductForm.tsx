import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { HiArrowPath } from "react-icons/hi2";
import { useNotificationSound } from "../../hooks/useNotificationSound";
import { CATEGORIES } from "../../services/Categories";
import DragDropImages from "../../ui/DragDropImages";
import useAddProduct from "./useAddProduct";
import { generateSKU } from "../../utils/helpers";
import { t } from "i18next";

const ProductForm = ({ onClose }: any) => {
  const [sku, setSku] = useState("");

  function randomeSku() {
    // generate a random sku like this 23LK2J4239
    const sku = generateSKU();
    setSku(sku);
  }
  const [items, setItems] = useState([]);
  const {
    setValue,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const playNotificationSound = useNotificationSound();

  const { mutate, isLoading } = useAddProduct();

  const onSubmit = async (data: any) => {
    // Prepare data to include images array
    data.images = items.map((item: any) => item.file);

    mutate(data, {
      onSuccess: () => {
        playNotificationSound();
        toast.success(t("Product created successfully"));
        onClose();
      },
      onError: (error: any) => {
        toast.error(error.message);
      },
    });
  };

  const handleImageChangeFromDragDrop = (newItems: any) => {
    setItems(newItems);
  };
  return (
    <div className="overflow-y-scroll min-w-[500px] max-h-[500px]">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mx-auto w-full flex flex-col gap-4 p-10"
      >
        <div className="flex flex-col gap-2 relative">
          <label>{t("SKU")}</label>
          <input
            value={sku}
            className="rounded-md border border-[#e0e0e0] dark:bg-gray-800 dark:text-gray-200  bg-white py-1 text-base font-medium   text-gray-800    outline-none focus:border-[#6A64F1] focus:shadow-md w-full p-1 px-2"
            type="text"
            {...register("sku", { required: t("SKU is required") })}
          />
          <span
            onClick={randomeSku}
            className="text-gray-500 cursor-pointer absolute right-2 top-10"
          >
            <HiArrowPath size={20} />
          </span>
          {errors.sku && (
            <span className="text-red-500 text-[12px]">
              {errors.sku.message as string}
            </span>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label>{t("Name")}</label>
          <input
            className="rounded-md border border-[#e0e0e0] dark:bg-gray-800 dark:text-gray-200  bg-white py-1 text-base font-medium   text-gray-800    outline-none focus:border-[#6A64F1] focus:shadow-md w-full p-1 px-2"
            type="text"
            {...register("name", { required: t("Name is required") })}
          />
          {errors.name && (
            <span className="text-red-500 text-[12px]">
              {errors.name.message as string}
            </span>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label>{t("Original Price")}</label>
          <input
            className="rounded-md border border-[#e0e0e0] dark:bg-gray-800 dark:text-gray-200  bg-white py-1 text-base font-medium   text-gray-800    outline-none focus:border-[#6A64F1] focus:shadow-md w-full p-1 px-2"
            type="number"
            {...register("originalPrice", {
              required: t("Original price is required"),
            })}
          />
          {errors.originalPrice && (
            <span className="text-red-500 text-[12px]">
              {errors.originalPrice.message as string}
            </span>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label>{t("Selling Price")}</label>
          <input
            className="rounded-md border border-[#e0e0e0] dark:bg-gray-800 dark:text-gray-200  bg-white py-1 text-base font-medium   text-gray-800    outline-none focus:border-[#6A64F1] focus:shadow-md w-full p-1 px-2"
            type="number"
            {...register("price", { required: t("Price is required") })}
          />
          {errors.price && (
            <span className="text-red-500 text-[12px]">
              {errors.price.message as string}
            </span>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label>{t("Discount")}</label>
          <input
            className="rounded-md border border-[#e0e0e0] dark:bg-gray-800 dark:text-gray-200  bg-white py-1 text-base font-medium   text-gray-800    outline-none focus:border-[#6A64F1] focus:shadow-md w-full p-1 px-2"
            type="number"
            {...register("discount")}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label>{t("Quantity")}</label>
          <input
            className="rounded-md border border-[#e0e0e0] dark:bg-gray-800 dark:text-gray-200  bg-white py-1 text-base font-medium   text-gray-800    outline-none focus:border-[#6A64F1] focus:shadow-md w-full p-1 px-2"
            type="number"
            {...register("quantity", { required: t("Quantity is required") })}
          />
          {errors.quantity && (
            <span className="text-red-500 text-[12px]">
              {errors.quantity.message as string}
            </span>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label>{t("Description")}</label>
          <textarea
            className="rounded-md border border-[#e0e0e0] dark:bg-gray-800 dark:text-gray-200  bg-white py-1 text-base font-medium   text-gray-800    outline-none focus:border-[#6A64F1] focus:shadow-md w-full p-1 px-2"
            {...register("description", {
              required: t("Description is required"),
            })}
          />
        </div>
        {errors.description && (
          <span className="text-red-500 text-[12px]">
            {errors.description.message as string}
          </span>
        )}

        <div className="flex flex-col gap-2">
          <label>{t("Min Order")}</label>
          <input
            className="rounded-md border border-[#e0e0e0] dark:bg-gray-800 dark:text-gray-200  bg-white py-1 text-base font-medium   text-gray-800    outline-none focus:border-[#6A64F1] focus:shadow-md w-full p-1 px-2"
            type="number"
            {...register("minOrder", {
              required: t("Min order is required"),
              min: { value: 0, message: t("Min order must be at least 0") },
            })}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label>{t("Category")}</label>
          <select
            className="rounded-md border border-[#e0e0e0] dark:bg-gray-800 dark:text-gray-200  bg-white py-1 text-base font-medium   text-gray-800    outline-none focus:border-[#6A64F1] focus:shadow-md w-full p-1 px-2"
            {...register("category", { required: t("Category is required") })}
          >
            {CATEGORIES.map((category, i: any) => (
              <option key={i} value={category}>
                {category}
              </option>
            ))}
          </select>
          {errors.category && (
            <span className="text-red-500 text-[12px]">
              {errors.category.message as string}
            </span>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label>{t("Warehouse")}</label>
          <input
            className="rounded-md border border-[#e0e0e0] dark:bg-gray-800 dark:text-gray-200  bg-white py-1 text-base font-medium   text-gray-800    outline-none focus:border-[#6A64F1] focus:shadow-md w-full p-1 px-2"
            type="text"
            {...register("warehouse", { required: t("Warehouse is required") })}
          />
        </div>
        {errors.warehouse && (
          <span className="text-red-500 text-[12px]">
            {errors.warehouse.message as string}
          </span>
        )}

        <div className="flex flex-col gap-2">
          <label>{t("Colors")}</label>
          <input
            className="rounded-md border border-[#e0e0e0] dark:bg-gray-800 dark:text-gray-200  bg-white py-1 text-base font-medium   text-gray-800    outline-none focus:border-[#6A64F1] focus:shadow-md w-full p-1 px-2"
            type="text"
            {...register("colors")}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label>{t("Brand")}</label>
          <input
            className="rounded-md border border-[#e0e0e0] dark:bg-gray-800 dark:text-gray-200  bg-white py-1 text-base font-medium   text-gray-800    outline-none focus:border-[#6A64F1] focus:shadow-md w-full p-1 px-2"
            type="text"
            {...register("brand")}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label>{t("Weight(kg)")}</label>
          <input
            className="rounded-md border border-[#e0e0e0] dark:bg-gray-800 dark:text-gray-200  bg-white py-1 text-base font-medium   text-gray-800    outline-none focus:border-[#6A64F1] focus:shadow-md w-full p-1 px-2"
            type="number"
            {...register("weight", {
              required: t("Weight is required"),
              min: { value: 0, message: t("Weight must be at least 0") },
            })}
          />
          {errors.weight && (
            <span className="text-red-500 text-[12px]">
              {errors.weight.message as string}
            </span>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label>{t("Images")}</label>
          <DragDropImages onChange={handleImageChangeFromDragDrop} />
        </div>

        <div className="flex justify-start gap-4 mt-4">
          <button
            type="submit"
            className="px-6 py-2 bg-sky-500 text-white rounded-md shadow-md transition duration-300 hover:bg-[#553C9A] focus:outline-none focus:ring-2 focus:ring-[#6A64F1]"
          >
            {isLoading ? t("Submitting...") : t("Submit")}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2 bg-white text-gray-900 border-black border rounded-md shadow-md transition duration-300 hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300"
          >
            {t("Cancel")}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
