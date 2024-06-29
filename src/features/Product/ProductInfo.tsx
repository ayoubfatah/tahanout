import React, { useState } from "react";
import { Product } from "../../Types/types";
import { formatCurrency } from "../../utils/helpers";
import Modal from "../../ui/Modal";
import EditProductForm from "../Products/EditProductForm";

type ProductInfoType = {
  product: Product | undefined | null;
  handleEdit: () => void;
  testing?: any;
};

const truncateDescription = (description: string, wordLimit: number) => {
  const words = description.split(" ");
  if (words.length <= wordLimit) return description;
  return words.slice(0, wordLimit).join(" ") + "...";
};

export default function ProductInfo({
  product,
  testing,
  handleEdit,
}: ProductInfoType) {
  const [showFullDescription, setShowFullDescription] = useState(false);

  const toggleDescription = () => setShowFullDescription(!showFullDescription);

  const wordLimit = 20;
  const description =
    product && product.description
      ? showFullDescription
        ? product.description
        : truncateDescription(product.description, wordLimit)
      : "";

  return (
    <Modal>
      <div className="space-y-2 w-full">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">{product?.name}</h2>
          <Modal.Open opens="editProduct">
            <button
              onClick={handleEdit}
              className=" bg-blue-500 text-white px-4 py-2 rounded-md"
            >
              Edit
            </button>
          </Modal.Open>
          <Modal.Window name="editProduct">
            <EditProductForm onClose={() => {}} data={product as Product} />
          </Modal.Window>
        </div>
        <div className="text-lg ">
          <span className="font-[600] text-[16px]">SKU</span>: {product?.sku}
        </div>
        <div className="text-lg ">
          <span className="font-[600] text-[16px]">Price</span>:{" "}
          {formatCurrency(product?.price ?? 0)}
        </div>
        <div className="text-lg ">
          <span className="font-[600] text-[16px]">Discount Price</span>:{" "}
          {formatCurrency(product?.discount ?? 0)}
        </div>
        <div className="text-lg">
          <span className="font-[600] text-[16px]">Quantity</span>:{" "}
          {product?.quantity}
        </div>
        <div className="text-lg">
          <span className="font-[600] text-[16px]">Min Order</span>: 29
        </div>
        <div className="text-[1Opx]">
          <span className="font-[600] text-[16px]">Description</span>:{" "}
          {description}
          {product &&
            product.description &&
            product.description.split(" ").length > wordLimit && (
              <button
                onClick={toggleDescription}
                className="text-blue-500 ml-2 underline"
              >
                {showFullDescription ? "Show Less" : "See More"}
              </button>
            )}
        </div>
        <div className="text-lg">
          <span className="font-[600] text-[16px]">Category</span>:{" "}
          {product?.category}
        </div>
        <div className="text-lg">
          <span className="font-[600] text-[16px]">Brand</span>:{" "}
          {product?.brand}
        </div>
        <div className="text-lg flex gap-2 items-center">
          <span className="font-[600] text-[16px]">Colors:</span>
          {product?.colors?.split(",").map((color) => (
            <div
              key={color}
              className={`w-5 h-5 shadow-md rounded-full ${
                color === "white" ? "border border-black" : ""
              }`}
              style={{ backgroundColor: color }}
            ></div>
          ))}
        </div>

        <div className="text-lg">
          <span className="font-[600] text-[16px]">Specifications</span>:
        </div>
        <ul className="ml-4 list-disc">
          <li>Switch Type: {testing.specifications.switchType}</li>
          <li>Backlight: {testing.specifications.backlight}</li>
          <li>Connectivity: {testing.specifications.connectivity}</li>
          <li>Key Rollover: {testing.specifications.keyRollOver}</li>
          <li>Weight: {testing.specifications.weight}</li>
        </ul>
        <div className="text-lg flex gap-2 items-center">
          <span className="font-[600] text-[16px]">Warehouse:</span>
          <span>{product?.warehouse}</span>
        </div>
      </div>
    </Modal>
  );
}
