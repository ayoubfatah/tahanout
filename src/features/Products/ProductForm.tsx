import React, { useState } from "react";
import { useForm } from "react-hook-form";
import useAddProduct from "./useAddProduct";
import Spinner from "../../ui/Spinner";
import toast from "react-hot-toast";
import { MdDelete } from "react-icons/md";
import DragDropImages from "../../ui/DragDropImages";

const ProductForm = ({ onClose }: any) => {
  const [items, setItems] = useState([]);
  const {
    setValue,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { mutate, isLoading } = useAddProduct();

  const onSubmit = async (data: any) => {
    // Prepare data to include images array
    data.images = items.map((item: any) => item.file);

    console.log(data);

    mutate(data, {
      onSuccess: () => {
        toast.success("Product created successfully");
        onClose();
      },
      onError: (error) => {
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
        <div className="flex flex-col gap-2">
          <label>SKU:</label>
          <input
            className="rounded-md border border-[#e0e0e0] bg-white py-1 text-base font-medium text-gray-900 outline-none focus:border-[#6A64F1] focus:shadow-md w-full p-1 px-2"
            type="text"
            {...register("sku", { required: "SKU is required" })}
          />
          {errors.sku && (
            <span className="text-red-500 text-[12px]">
              {errors.sku.message as string}
            </span>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label>Name:</label>
          <input
            className="rounded-md border border-[#e0e0e0] bg-white py-1 text-base font-medium text-gray-900 outline-none focus:border-[#6A64F1] focus:shadow-md w-full p-1 px-2"
            type="text"
            {...register("name", { required: "Name is required" })}
          />
          {errors.name && (
            <span className="text-red-500 text-[12px]">
              {errors.name.message as string}
            </span>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label>Price:</label>
          <input
            className="rounded-md border border-[#e0e0e0] bg-white py-1 text-base font-medium text-gray-900 outline-none focus:border-[#6A64F1] focus:shadow-md w-full p-1 px-2"
            type="number"
            {...register("price", { required: "Price is required" })}
          />
          {errors.price && (
            <span className="text-red-500 text-[12px]">
              {errors.price.message as string}
            </span>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label>Discount:</label>
          <input
            className="rounded-md border border-[#e0e0e0] bg-white py-1 text-base font-medium text-gray-900 outline-none focus:border-[#6A64F1] focus:shadow-md w-full p-1 px-2"
            type="number"
            {...register("discount")}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label>Quantity:</label>
          <input
            className="rounded-md border border-[#e0e0e0] bg-white py-1 text-base font-medium text-gray-900 outline-none focus:border-[#6A64F1] focus:shadow-md w-full p-1 px-2"
            type="number"
            {...register("quantity", { required: "Quantity is required" })}
          />
          {errors.quantity && (
            <span className="text-red-500 text-[12px]">
              {errors.quantity.message as string}
            </span>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label>Description:</label>
          <textarea
            className="rounded-md border border-[#e0e0e0] bg-white py-1 text-base font-medium text-gray-900 outline-none focus:border-[#6A64F1] focus:shadow-md w-full p-1 px-2"
            {...register("description", {
              required: "Description is required",
            })}
          />
        </div>
        {errors.description && (
          <span className="text-red-500 text-[12px]">
            {errors.description.message as string}
          </span>
        )}

        <div className="flex flex-col gap-2">
          <label>Min Order:</label>
          <input
            className="rounded-md border border-[#e0e0e0] bg-white py-1 text-base font-medium text-gray-900 outline-none focus:border-[#6A64F1] focus:shadow-md w-full p-1 px-2"
            type="number"
            {...register("minOrder", {
              required: "min order is required",
              min: { value: 0, message: "min order must be at least 0" },
            })}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label>Category:</label>
          <select
            className="rounded-md border border-[#e0e0e0] bg-white py-1 text-base font-medium text-gray-900 outline-none focus:border-[#6A64F1] focus:shadow-md w-full p-1 px-2"
            {...register("category", { required: "Category is required" })}
          >
            <option value="">Select a category</option>
            <option value="electronics">Electronics</option>
            <option value="fashion">Fashion</option>
            <option value="home">Home</option>
            <option value="beauty">Beauty</option>
            <option value="sports">Sports</option>
            <option value="automotive">Automotive</option>
            <option value="toys">Toys</option>
            <option value="grocery">Grocery</option>
            <option value="health">Health</option>
            <option value="books">Books</option>
          </select>
          {errors.category && (
            <span className="text-red-500 text-[12px]">
              {errors.category.message as string}
            </span>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label>Warehouse:</label>
          <input
            className="rounded-md border border-[#e0e0e0] bg-white py-1 text-base font-medium text-gray-900 outline-none focus:border-[#6A64F1] focus:shadow-md w-full p-1 px-2"
            type="text"
            {...register("warehouse", { required: "Warehouse is required" })}
          />
        </div>
        {errors.warehouse && (
          <span className="text-red-500 text-[12px]">
            {errors.warehouse.message as string}
          </span>
        )}
        <div className="flex flex-col gap-2">
          <label>Colors:</label>
          <input
            className="rounded-md border border-[#e0e0e0] bg-white py-1 text-base font-medium text-gray-900 outline-none focus:border-[#6A64F1] focus:shadow-md w-full p-1 px-2"
            type="text"
            {...register("colors")}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label>Brand:</label>
          <input
            className="rounded-md border border-[#e0e0e0] bg-white py-1 text-base font-medium text-gray-900 outline-none focus:border-[#6A64F1] focus:shadow-md w-full p-1 px-2"
            type="text"
            {...register("brand")}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label>Weight(kg):</label>
          <input
            className="rounded-md border border-[#e0e0e0] bg-white py-1 text-base font-medium text-gray-900 outline-none focus:border-[#6A64F1] focus:shadow-md w-full p-1 px-2"
            type="number"
            {...register("weight", {
              required: "Weight is required",
              min: { value: 0, message: "Weight must be at least 0" },
            })}
          />
          {errors.weight && (
            <span className="text-red-500 text-[12px]">
              {errors.weight.message as string}
            </span>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label>Images:</label>
          <DragDropImages
            items={items}
            setItems={setItems}
            onChange={handleImageChangeFromDragDrop}
          />
        </div>

        <div className="flex justify-end gap-4 mt-4">
          <button
            type="submit"
            className="px-6 py-2 bg-[#6A64F1] text-white rounded-md shadow-md transition duration-300 hover:bg-[#553C9A] focus:outline-none focus:ring-2 focus:ring-[#6A64F1]"
          >
            {isLoading ? "Submitting..." : "Submit"}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2 bg-gray-300 text-gray-800 rounded-md shadow-md transition duration-300 hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
