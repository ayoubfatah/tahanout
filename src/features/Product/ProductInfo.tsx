import React, { useState } from "react";
import { Product } from "../../Types/types";
import { formatCurrency } from "../../utils/helpers";
import Modal from "../../ui/Modal";
import EditProductForm from "../Products/EditProductForm";
import Button from "../../ui/Button";
import { useTranslation } from "react-i18next";

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
  console.log(product, "product");
  const { t } = useTranslation();
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
            <Button
              text={t("Edit")}
              onClick={handleEdit}
              textColor="text-white"
              bgColor="bg-sky-500"
            />
          </Modal.Open>
          <Modal.Window name="editProduct">
            <EditProductForm onClose={() => {}} data={product as Product} />
          </Modal.Window>
        </div>
        <div className="text-lg ">
          <span className="font-[600] text-[16px]">{t("SKU")}</span>:{" "}
          {product?.sku}
        </div>
        <div className="text-lg ">
          <span className="font-[600] text-[16px]">{t("Price")}</span>:{" "}
          {formatCurrency(product?.price ?? 0)}
        </div>
        <div className="text-lg ">
          <span className="font-[600] text-[16px]">{t("Discount Price")}</span>:{" "}
          {formatCurrency(product?.discount ?? 0)}
        </div>
        <div className="text-lg">
          <span className="font-[600] text-[16px]">{t("Quantity")}</span>:{" "}
          {product?.quantity}
        </div>
        <div className="text-lg">
          <span className="font-[600] text-[16px]">{t("Min Order")}</span>: 29
        </div>
        <div className="text-[1Opx]">
          <span className="font-[600] text-[16px]">{t("Description")}</span>:{" "}
          {description}
          {product &&
            product.description &&
            product.description.split(" ").length > wordLimit && (
              <button
                onClick={toggleDescription}
                className="text-blue-500 ml-2 underline"
              >
                {showFullDescription ? t("Show Less") : t("See More")}
              </button>
            )}
        </div>
        <div className="text-lg">
          <span className="font-[600] text-[16px]">{t("Category")}</span>:{" "}
          {product?.category}
        </div>
        <div className="text-lg">
          <span className="font-[600] text-[16px]">{t("Brand")}</span>:{" "}
          {product?.brand}
        </div>
        <div className="text-lg flex gap-2 items-center">
          <span className="font-[600] text-[16px]">{t("Colors")}:</span>
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
          <span className="font-[600] text-[16px]">{t("Specifications")}:</span>
        </div>
        <ul className="ml-4 list-disc">
          {testing.specifications &&
            Object.keys(product && product.specifications).map((key) => (
              <li key={key}>
                <span className="font-semibold text-[15px]"> {key}</span>:{" "}
                {product && product.specifications[key]}
              </li>
            ))}
        </ul>

        <div className="text-lg flex gap-2 items-center">
          <span className="font-[600] text-[16px]">{t("Warehouse")}:</span>
          <span>{product?.warehouse}</span>
        </div>
        <div>
          <span className="font-[600] text-[16px]">{t("Offers")}:</span>
          <ul className="text-green-500">
            {product?.offers &&
              product.offers.length > 0 &&
              product.offers.map((offer: any) => {
                return (
                  <li>
                    {offer.percentage}% discount on {offer.quantity} orders or
                    above
                  </li>
                );
              })}
          </ul>
        </div>
      </div>
    </Modal>
  );
}
