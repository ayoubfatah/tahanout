import React from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { formatCurrency } from "../../utils/helpers";

export default function TopProductsRow({ isLast, product, i }: any) {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div
      className={`p-5 cursor-pointer flex items-center justify-between hover:bg-gray-100 dark:hover:bg-gray-700 border-gray-300 border-dashed ${
        isLast ? "" : "border-b"
      } `}
      onClick={() => navigate(`/products/${product.productId}`)}
    >
      <div className="w-10 h-10 flex items-center justify-center">
        <span className="text-gray-600 dark:text-gray-200 text-[12px]">
          {i + 1}#
        </span>
        <img
          className="w-full h-full object-cover bg-center bg-no-repeat"
          src={product.productImage}
          alt={product.productName}
        />
      </div>
      <div className="flex justify-center flex-col text-[12px]">
        <span className="text-gray-600 dark:text-gray-200 truncate w-32">
          {product.productName}
        </span>
        <span className="text-gray-600 dark:text-gray-200">
          ${product.productPrice}
        </span>
      </div>
      <div className="flex justify-center flex-col text-[12px]">
        <span className="text-gray-400 dark:text-gray-300">
          {t("Quantity")}
        </span>
        <span className="text-gray-600 dark:text-gray-200">
          {product.productQuantity}
        </span>
      </div>
      <div className="flex justify-center flex-col text-[12px]">
        <span className="text-gray-400 dark:text-gray-200">{t("Orders")}</span>
        <span className="text-gray-600 dark:text-gray-200">
          {product.totalOrders}
        </span>
      </div>
      <div className="flex justify-center flex-col text-[12px]">
        <span className="text-gray-400 dark:text-gray-200">
          {t("Total Revenues")}
        </span>
        <span className="text-blue-500">
          {formatCurrency(product.totalRevenues)}
        </span>
      </div>
    </div>
  );
}
