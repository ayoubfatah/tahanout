import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { format } from "date-fns";
import { enUS, fr } from "date-fns/locale";
import { OrderType } from "../../Types/types";
import { useTahanout } from "../../contextApi/useTahanoutCA";
import { useTranslation } from "react-i18next";

const BarChartSales = ({ orders }: { orders: OrderType[] | any }) => {
  const { t, i18n } = useTranslation();
  const { isDarkMode } = useTahanout();
  const locale = i18n.language === "fr" ? fr : enUS;

  // Get months 
  const months = Array.from({ length: 12 }, (_, i) =>
    format(new Date(0, i), "MMM", { locale })
  );

  const data = months.map((month, index) => {
    const monthOrders = orders.filter(
      (order: any) => new Date(order.createdAt).getMonth() === index
    );
    const originalPrice = monthOrders.reduce(
      (total: number, order: any) =>
        order.status === "delivered"
          ? order.products.originalPrice * order.quantity + total
          : total,
      0
    );
    const sales = monthOrders.reduce(
      (total: number, order: any) =>
        order.status === "delivered" ? total + order.totalPrice : total,
      0
    );

    return {
      month: month,
      profits: (sales - originalPrice).toFixed(2),
      sales: sales.toFixed(2),
    };
  });
  const result = Object.values(data);

  return (
    <div className="col-span-4 bg-white dark:bg-gray-800 p-5">
      <h2 className="text-[20px] font-semibold">
        {t("Monthly Sales and Profit Overview")}
      </h2>

      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          data={result}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 9" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip
            contentStyle={{
              backgroundColor: isDarkMode ? "#2D3748" : "#FFFFFF", // Dark gray or white background
              borderColor: isDarkMode ? "#2D3748" : "#E2E8F0", // Border color based on mode
              color: isDarkMode ? "#FFFFFF" : "#000000", // Text color based on mode
            }}
            formatter={(value, name: string) => [
              `$${value}`,
              typeof name === "string"
                ? t(name.charAt(0).toUpperCase() + name.slice(1))
                : "",
            ]}
          />

          <Bar dataKey="sales" fill="#ffd700" name={t("Sales")} barSize={20} />
          <Bar
            dataKey="profits"
            fill="#3981e6"
            name={t("Profits")}
            barSize={20}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarChartSales;
