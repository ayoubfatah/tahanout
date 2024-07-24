import React from "react";
import {
  formatCurrency,
  formatDateToYearMonthDayHoursMin,
} from "../../utils/helpers";
import { useTranslation } from "react-i18next";

export const OrderSection: React.FC<{
  title: string;
  settings?: any;
  order?: any;
}> = ({ title, order, settings }) => {
  const { t } = useTranslation();

  return (
    <div className="p-4 bg-white dark:bg-gray-800 shadow-md rounded-md fade-in">
      <h2 className="text-xl font-semibold text-sky-500 mb-2">{t(title)}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {title === t("Order Info") && (
          <>
            <div className="border p-2 rounded-md">
              <span className="font-medium capitalize">{t("Order ID")}:</span>{" "}
              {order.id}
            </div>
            <div className="border p-2 rounded-md">
              <span className="font-medium capitalize">{t("Status")}:</span>{" "}
              {t(order.status)}
            </div>
            <div className="border p-2 rounded-md">
              <span className="font-medium capitalize">{t("Order Date")}:</span>{" "}
              {formatDateToYearMonthDayHoursMin(order.createdAt)}
            </div>
            <div className="border p-2 rounded-md">
              <span className="font-medium capitalize">
                {t("Estimated Delivery date")}:
              </span>{" "}
              {formatDateToYearMonthDayHoursMin(order.createdAt)}
            </div>
            <div className="border p-2 rounded-md">
              <span className="font-medium capitalize">{t("Total")}:</span>{" "}
              {formatCurrency(order.totalPrice)}
            </div>
            <div className="border p-2 rounded-md">
              <span className="font-medium capitalize">{t("Payment")}:</span>{" "}
              {order?.paymentStatus}
            </div>
            {order.confirmedAt && (
              <div className="border p-2 rounded-md">
                <span className="font-medium capitalize">
                  {t("Confirmation Date")}:
                </span>{" "}
                {formatDateToYearMonthDayHoursMin(order.confirmedAt)}
              </div>
            )}
            {order.deliveredAt && (
              <div className="border p-2 rounded-md">
                <span className="font-medium capitalize">
                  {t("Delivery Date")}:
                </span>{" "}
                {formatDateToYearMonthDayHoursMin(order.deliveredAt)}
              </div>
            )}
            {order.cancelledAt && (
              <div className="border p-2 rounded-md">
                <span className="font-medium capitalize">
                  {t("Cancelled Date")}:
                </span>{" "}
                {formatDateToYearMonthDayHoursMin(order.cancelledAt)}
              </div>
            )}
          </>
        )}
        {title === t("Customer Info") && (
          <>
            <div className="border p-2 rounded-md">
              <span className="font-medium capitalize">{t("Name")}:</span>{" "}
              {order.customers.fullName}
            </div>
            <div className="border p-2 rounded-md">
              <span className="font-medium capitalize">{t("Email")}:</span>{" "}
              {order.customers.email}
            </div>
            <div className="border p-2 rounded-md">
              <span className="font-medium capitalize">{t("Phone")}:</span>{" "}
              {order.customers.phoneNumber}
            </div>
            <div className="border p-2 rounded-md">
              <span className="font-medium capitalize">{t("Address")}:</span>{" "}
              {order.customers.address}
            </div>
            <div className="border p-2 rounded-md">
              <span className="font-medium capitalize">{t("Country")}:</span>{" "}
              {order.customers.country}
            </div>
            <div className="border p-2 rounded-md">
              <span className="font-medium capitalize">{t("City")}:</span>{" "}
              {order.customers.city}
            </div>
            <div className="border p-2 rounded-md">
              <span className="font-medium capitalize">{t("Zip Code")}:</span>{" "}
              {order.customers.zipCode}
            </div>
            <div className="border p-2 rounded-md">
              <span className="font-medium capitalize">
                {t("National ID")}:
              </span>{" "}
              {order.customers.nationalId?.toUpperCase()}
            </div>
          </>
        )}
        {title === t("Shipping Details") && (
          <>
            <div className="border p-2 rounded-md">
              <span className="font-medium capitalize">{t("Method")}:</span>{" "}
              {t("Standard Shipping")}
            </div>
            <div className="border p-2 rounded-md">
              <span className="font-medium capitalize">
                {t("Tracking Number")}:
              </span>{" "}
              3oi23oi2jljdlajd
            </div>
            <div className="border p-2 rounded-md">
              <span className="font-medium capitalize">
                {t("Shipping Cost")}:
              </span>{" "}
              {formatCurrency(settings[0].shippingPrice)}
            </div>
          </>
        )}
        {title === t("Payment Method") && (
          <>
            <div className="border p-2 rounded-md">
              <span className="font-medium capitalize">{t("Method")}:</span>{" "}
              {order.paymentMethod}
            </div>
            {order.paymentMethod === "credit card" && (
              <div className="border p-2 rounded-md">
                <span className="font-medium capitalize">
                  {t("Card Number")}:
                </span>{" "}
                93040 93040 93040
              </div>
            )}
            {order.paymentMethod === "paypal" && (
              <div className="border p-2 rounded-md">
                <span className="font-medium capitalize">{t("Email")}:</span>{" "}
                {order.customers.email}
              </div>
            )}
            {order.paymentMethod === "cod" && (
              <div className="border p-2 rounded-md">
                <span className="font-medium capitalize">
                  {t("Payment Status")}:
                </span>{" "}
                {order.paymentStatus}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};
