import React, { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import useAddProduct from "./useAddProduct";
import Spinner from "../../ui/Spinner";
import toast from "react-hot-toast";
import { MdDelete } from "react-icons/md";

const ProductForm = ({ onClose }: any) => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageSize, setImageSize] = useState<string | number>(0);
  const [imageName, setImageName] = useState("");
  let file: any;
  const {
    setValue,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { mutate, isLoading } = useAddProduct();

  const onSubmit = (data: any) => {
    console.log(data);
    mutate(
      {
        ...data,
        image: data.image[0],
        imgDetails: [imageSize + "", imageName],
      },
      {
        onSuccess: () => {
          toast.success("Product created successfully");
          onClose();
          URL.revokeObjectURL(file);
        },
        onError: (err: any) => {
          toast.error(err.message);
        },
      }
    );
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    file = event.target.files?.[0];
    console.log(file);
    if (file) {
      setImagePreview(URL.createObjectURL(file));
      setImageSize(file.size);
      setImageName(file.name);
    }
  };

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleImageReset = () => {
    setValue("image", null);
    setImagePreview(null);
    setImageName("");
    setImageSize(0);
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
          <label>Image:</label>

          <input
            type="file"
            className={` ${
              imagePreview ? "hidden" : "block"
            }  text-sm text-black
            file:mr-5 file:py-2 file:px-4 file:border-[0px] 
            file:text-xs file:font-medium
            file:bg-sky-500 file:text-white
            hover:file:cursor-pointer hover:file:bg-sky-600
            hover:file:text-white`}
            {...register("image")}
            onChange={handleImageChange}
          />

          {errors.image && (
            <span className="text-red-500 text-[12px]">
              {errors.image.message as string}
            </span>
          )}
          {imagePreview && (
            <div className="flex items-center justify-between">
              <img
                src={imagePreview}
                alt="Image Preview"
                className="w-20 h-14 object-cover"
              />
              <span>{imageName}</span>
              <span>Size : {Math.round(+imageSize / 1024)}kb</span>
              <button
                type="button"
                className="text-gray-600 rounded-md"
                onClick={handleImageReset}
              >
                <MdDelete />
              </button>
            </div>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label>Additional Images:</label>
          <input
            className="rounded-md border border-[#e0e0e0] bg-white py-1 text-base font-medium text-gray-900 outline-none focus:border-[#6A64F1] focus:shadow-md w-full p-1 px-2"
            type="text"
            {...register("additional_images")}
          />
        </div>

        <div className="flex gap-2">
          <button
            disabled={isLoading}
            className="text-white bg-sky-500 px-4 py-2 rounded-md mt-3"
          >
            Update Product
          </button>
          <button
            disabled={isLoading}
            type="button"
            onClick={onClose}
            className="text-black bg-white border border-black px-4 py-2 rounded-md mt-3"
          >
            Close
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
