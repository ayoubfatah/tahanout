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
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageName, setImageName] = useState<string>("");
  const [imageSize, setImageSize] = useState<number>(0);
  let file: any;
  const {
    setValue,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      ...product,
    },
  });

  const { isEditing, mutate } = useUpdateProduct();
  useEffect(() => {
    if (product) {
      setImagePreview(product?.image);
      setImageName(product?.imgDetails[1]);
      setImageSize(product?.imgDetails[0]);
    }
  }, [product?.image]);

  const onSubmit = (data: any) => {
    // Handle the form submission
    console.log(data);
    const imageType =
      typeof data.image === "string" ? data.image : data.image[0];
    mutate(
      { newProductData: { ...data, image: imageType }, id: product.id },
      {
        onSuccess: () => {
          onClose();
        },
      }
    );
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImagePreview(imageUrl);
      setImageName(file.name);
      setImageSize(file.size);
    }
  };

  const handleImageReset = () => {
    // Handle image reset
    setValue("image", null);
    setImagePreview(null);
    setImageName("");
    setImageSize(0);
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
      <div className="flex   flex-col gap-2 items-start">
        <label>Image:</label>
        {!imagePreview && (
          <input
            disabled={isEditing}
            className="rounded-md border  border-[#e0e0e0] bg-white py-1 text-base font-medium text-gray-900 outline-none focus:border-[#6A64F1] focus:shadow-md w-full p-1 px-2 file:mr-5 file:py-2 file:px-4 file:border-[0px] file:text-xs file:font-medium file:bg-sky-500 file:text-white hover:file:cursor-pointer hover:file:bg-sky-600 hover:file:text-white"
            type="file"
            {...register("image")}
            onChange={handleImageChange}
          />
        )}
        {imagePreview && (
          <div className="flex rounded-md  border border-dashed border-gray-300    w-full items-center justify-between">
            <img
              src={imagePreview}
              alt="Image Preview"
              className="w-20 h-full bg-center bg-cover bg-no-repeat object-cover"
            />
            <span>{imageName}</span>
            <span>Size : {Math.round(imageSize / 1024)}kbs</span>

            <button
              type="button"
              className="text-gray-600 rounded-md  -translate-x-1"
              onClick={handleImageReset}
            >
              <MdDelete />
            </button>
          </div>
        )}
      </div>
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
          onClick={onSubmit}
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
