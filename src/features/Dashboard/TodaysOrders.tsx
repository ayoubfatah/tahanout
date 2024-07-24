import { endOfDay, parseISO, startOfDay } from "date-fns";
import { HiOutlineEye } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Spinner from "../../ui/Spinner";
import { formatCurrency, formatTime } from "../../utils/helpers";
import { useOrders } from "../Orders/useOrders";
import TodaysOrdersRow from "./TodaysOrdersRow";
import { OrderType } from "../../Types/types";

export default function TodaysOrders({ orders }: { orders: OrderType[] }) {
  const { t } = useTranslation();

  function getTodaysOrders(orders: any) {
    const now = new Date();
    const todayStart = startOfDay(now);
    const todayEnd = endOfDay(now);

    return orders?.filter((order: any) => {
      const orderDate = order.createdAt ? parseISO(order.createdAt) : null;
      return orderDate && orderDate >= todayStart && orderDate <= todayEnd;
    });
  }

  const todayPendingOrders = getTodaysOrders(orders);

  return (
    <div className="bg-white dark:bg-gray-800 p-5 col-span-4 flex flex-col gap-3 overflow-x-scroll rounded-md">
      <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200 flex items-center gap-1">
        {t("Today's Orders")}
      </h2>
      {todayPendingOrders?.length ? (
        <div className="px-1 bg-white dark:bg-gray-800 items-center gap-2">
          <div className="border-b border-gray-200 py-1.5 grid grid-cols-[1fr_1.7fr_1.7fr_1fr_1.3fr_1fr_1fr_1.2fr_1fr] text-gray-400 dark:text-gray-200 text-[12px]">
            <span>{t("Order ID")}</span>
            <span>{t("Customer")}</span>
            <span>{t("Product")}</span>
            <span>{t("SKU")}</span>
            <span>{t("Order Date")}</span>
            <span>{t("Quantity")}</span>
            <span>{t("Total")}</span>
            <span className="ml-4">{t("Status")}</span>
            <span></span>
          </div>
          {todayPendingOrders.map((order: any) => (
            <TodaysOrdersRow key={order.id} order={order} />
          ))}
        </div>
      ) : (
        <div>{t("No orders today ...")}</div>
      )}
    </div>
  );
}
