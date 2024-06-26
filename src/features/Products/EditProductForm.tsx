import React, { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Product } from "../../Types/types";
import useUpdateProduct from "./useUpdateProduct";
import { MdDelete } from "react-icons/md";

const ProductForm = ({
  data: product,
  onClose,
}: {
  data: Product;
  onClose: any;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      ...product,
    },
  });

  const { isEditing, mutate } = useUpdateProduct();

  const onSubmit = (data: any) => {
    // Handle the form submission

    mutate(
      { newProductData: { ...data, images: product.images }, id: product.id },
      {
        onSuccess: () => {
          onClose();
        },
      }
    );
  };

  const onCloseForm = () => {
    // Handle close action
    onClose();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="overflow-y-scroll w-[600px] h-[600px] py-10 px-8 flex flex-col gap-5"
    >
      <div className="flex flex-col gap-2 items-start">
        <label>SKU:</label>
        <input
          disabled={isEditing}
          className="rounded-md border border-[#e0e0e0] bg-white py-1 text-base font-medium text-gray-900 outline-none focus:border-[#6A64F1] focus:shadow-md w-full p-1 px-2"
          type="text"
          {...register("sku", { required: "SKU is required" })}
        />
        {errors.sku && (
          <span className="text-red-500 text-[12px]">{errors.sku.message}</span>
        )}
      </div>

      <div className="flex flex-col gap-2 items-start">
        <label>Name:</label>
        <input
          disabled={isEditing}
          className="rounded-md border border-[#e0e0e0] bg-white py-1 text-base font-medium text-gray-900 outline-none focus:border-[#6A64F1] focus:shadow-md w-full p-1 px-2"
          type="text"
          {...register("name", { required: "Name is required" })}
        />
        {errors.name && (
          <span className="text-red-500 text-[12px]">
            {errors.name.message}
          </span>
        )}
      </div>

      <div className="flex flex-col gap-2 items-start">
        <label>Price:</label>
        <input
          disabled={isEditing}
          className="rounded-md border border-[#e0e0e0] bg-white py-1 text-base font-medium text-gray-900 outline-none focus:border-[#6A64F1] focus:shadow-md w-full p-1 px-2"
          type="number"
          {...register("price", { required: "Price is required" })}
        />
        {errors.price && (
          <span className="text-red-500 text-[12px]">
            {errors.price.message}
          </span>
        )}
      </div>

      <div className="flex flex-col gap-2 items-start">
        <label>Discount:</label>
        <input
          disabled={isEditing}
          className="rounded-md border border-[#e0e0e0] bg-white py-1 text-base font-medium text-gray-900 outline-none focus:border-[#6A64F1] focus:shadow-md w-full p-1 px-2"
          type="number"
          {...register("discount")}
        />
      </div>

      <div className="flex flex-col gap-2 items-start">
        <label>Quantity:</label>
        <input
          disabled={isEditing}
          className="rounded-md border border-[#e0e0e0] bg-white py-1 text-base font-medium text-gray-900 outline-none focus:border-[#6A64F1] focus:shadow-md w-full p-1 px-2"
          type="number"
          {...register("quantity", { required: "Quantity is required" })}
        />
        {errors.quantity && (
          <span className="text-red-500 text-[12px]">
            {errors.quantity.message}
          </span>
        )}
      </div>

      <div className="flex flex-col gap-2 items-start">
        <label>Description:</label>
        <textarea
          className="h-[200px] rounded-md border border-[#e0e0e0] bg-white py-1 text-base font-medium text-gray-900 outline-none focus:border-[#6A64F1] focus:shadow-md w-full p-1 px-2"
          {...register("description", {
            required: "Description is required",
          })}
        />
        {errors.description && (
          <span className="text-red-500 text-[12px]">
            {errors.description.message}
          </span>
        )}
      </div>

      <div className="flex flex-col gap-2 items-start">
        <label>Min Order:</label>
        <input
          disabled={isEditing}
          className="rounded-md border border-[#e0e0e0] bg-white py-1 text-base font-medium text-gray-900 outline-none focus:border-[#6A64F1] focus:shadow-md w-full p-1 px-2"
          type="number"
          {...register("minOrder", {
            required: "Min order is required",
            min: { value: 0, message: "Min order must be at least 0" },
          })}
        />
      </div>

      <div className="flex flex-col gap-2 items-start">
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
            {errors.category.message}
          </span>
        )}
      </div>

      <div className="flex flex-col gap-2 items-start">
        <label>Warehouse:</label>
        <input
          disabled={isEditing}
          className="rounded-md border border-[#e0e0e0] bg-white py-1 text-base font-medium text-gray-900 outline-none focus:border-[#6A64F1] focus:shadow-md w-full p-1 px-2"
          type="text"
          {...register("warehouse", { required: "Warehouse is required" })}
        />
        {errors.warehouse && (
          <span className="text-red-500 text-[12px]">
            {errors.warehouse.message}
          </span>
        )}
      </div>

      <div className="flex flex-col gap-2 items-start">
        <label>Colors:</label>
        <input
          disabled={isEditing}
          className="rounded-md border border-[#e0e0e0] bg-white py-1 text-base font-medium text-gray-900 outline-none focus:border-[#6A64F1] focus:shadow-md w-full p-1 px-2"
          type="text"
          {...register("colors")}
        />
      </div>

      <div className="flex flex-col gap-2 items-start">
        <label>Brand:</label>
        <input
          disabled={isEditing}
          className="rounded-md border border-[#e0e0e0] bg-white py-1 text-base font-medium text-gray-900 outline-none focus:border-[#6A64F1] focus:shadow-md w-full p-1 px-2"
          type="text"
          {...register("brand")}
        />
      </div>

      <div className="flex flex-col gap-2 items-start">
        <label>Weight:</label>
        <input
          disabled={isEditing}
          className="rounded-md border border-[#e0e0e0] bg-white py-1 text-base font-medium text-gray-900 outline-none focus:border-[#6A64F1] focus:shadow-md w-full p-1 px-2"
          type="number"
          {...register("weight", {
            required: "Weight is required",
            min: { value: 0, message: "Weight must be at least 0" },
          })}
        />
        {errors.weight && (
          <span className="text-red-500 text-[12px]">
            {errors.weight.message}
          </span>
        )}
      </div>

      <div className="flex gap-2 ">
        <button
          disabled={isEditing}
          type="submit" // Changed to type="submit"
          className="text-white bg-sky-500 px-4 py-2 rounded-md mt-3"
        >
          Edit
        </button>

        <button
          disabled={isEditing}
          type="button"
          onClick={onCloseForm}
          className="text-black bg-white border border-black px-4 py-2 rounded-md mt-3"
        >
          Close
        </button>
      </div>
    </form>
  );
};

export default ProductForm;
