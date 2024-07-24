import React from "react";
import { useNavigate } from "react-router-dom";
import { formatCurrency } from "../../utils/helpers";
import { useTranslation } from "react-i18next";

export default function OrderProductSection({
  title,
  order,
}: {
  title: string;
  order: any;
}) {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className="p-4 bg-white dark:bg-gray-800 dark:text-gray-200 text-gray-800 shadow-md rounded-md fade-in">
      <h2 className="text-xl font-semibold text-sky-500 mb-2">{t(title)}</h2>
      <div className="space-y-2">
        <div className="border p-4 rounded-md">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <span
              role="button"
              onClick={() => navigate(`/products/${order?.products?.id}`)}
              className="hover:text-sky-500 block font-medium"
            >
              {order?.products?.name}
            </span>
            <span>
              <span className="font-semibold">{t("Quantity")}:</span>{" "}
              {order?.quantity}
            </span>

            <span>
              <span className="font-semibold">{t("Price")}:</span>{" "}
              {formatCurrency(order?.products?.price)}
            </span>

            <span>
              <span className="font-semibold">{t("Discount")}:</span>{" "}
              {formatCurrency(order?.products?.discount * order?.quantity)}
            </span>
            <span>
              <span className="font-semibold">{t("Total")}:</span>{" "}
              {formatCurrency(order?.totalPrice)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
