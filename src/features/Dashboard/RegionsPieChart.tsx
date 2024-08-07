import React from "react";
import {
  PieChart,
  Pie,
  Tooltip,
  Cell,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { moroccanRegionsAndCities } from "../../services/moroccanRegionsAndCities";
import { OrderType } from "../../Types/types";
import { filteredByDates, getDateInterval } from "../../utils/helpers";
import { eachDayOfInterval } from "date-fns";
import { useTahanout } from "../../contextApi/useTahanoutCA";
import { useTranslation } from "react-i18next";

const REGION_COLORS = {
  "Tanger-Tetouan-Al Hoceima": "#3b82f6", // Bright Blue
  Oriental: "#f97316", // Bright Orange
  "Fès-Meknès": "#8b5cf6", // Bright Purple
  "Rabat-Salé-Kénitra": "#eab308", // Bright Yellow
  "Béni Mellal-Khénifra": "#22c55e", // Bright Green
  "Casablanca-Settat": "#ef4444", // Bright Red
  "Marrakech-Safi": "#f59e0b", // Bright Amber
  "Drâa-Tafilalet": "#84cc16", // Bright Lime Green
  "Souss-Massa": "#10b981", // Bright Emerald
  "Guelmim-Oued Noun": "#06b6d4", // Bright Cyan
  "Laâyoune-Sakia El Hamra": "#a855f7", // Bright Violet
  "Dakhla-Oued Ed-Dahab": "#ec4899", // Bright Pink
};

const getAllRegions = (regionsData: any) => {
  return regionsData.regions.flatMap((region: any) => region.name);
};

const regions = getAllRegions(moroccanRegionsAndCities);

export default function RegionsPieChart({
  orders,
  numDays,
  datesFromDatePicker,
}: {
  orders: OrderType[];
  numDays: any;
  datesFromDatePicker?: any;
}) {
  const { start, end } = getDateInterval(numDays);
  const { t } = useTranslation();
  const allDates = datesFromDatePicker || eachDayOfInterval({ start, end });

  const { isDarkMode } = useTahanout();
  const dataBasedOnDate = allDates.map((date: any) => {
    const ordersDate = filteredByDates(orders, date);
    return ordersDate;
  });

  const flattenedData = dataBasedOnDate.flatMap((arr: Array<any>) => arr);

  // Filter out regions with zero orders
  const data = regions.map((region: any) => {
    const regionsOrders = flattenedData.filter(
      (order: any) => order.customers.region === region
    );

    return {
      name: region,
      orders: regionsOrders.reduce(
        (acc: any, order: any) => acc + order.quantity,
        0
      ),
    };
  });

  // Filter out regions with zero orders
  const filteredData = data.filter((entry: any) => entry.orders > 0);

  return (
    <div className="col-span-2 bg-white dark:bg-gray-800 p-5">
      <h2 className="text-[20px] font-semibold">
        {t("Summary of Orders by Moroccan Regions")}
      </h2>
      <div className="flex items-center overflow-hidden justify-center">
        <div className="w-full h-[300px]">
          {filteredData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  innerRadius={80}
                  outerRadius={110}
                  data={filteredData}
                  dataKey="orders"
                  nameKey="name"
                  cx="50%"
                  cy="60%"
                  fill="#8884d8"
                  paddingAngle={2}
                >
                  {filteredData.map((entry: any, index: number) => (
                    <Cell
                      key={`cell-${index}`}
                      stroke={isDarkMode ? "#1f2937" : "white"}
                      fill={
                        REGION_COLORS[
                          entry.name as keyof typeof REGION_COLORS
                        ] || "#BEF264"
                      }
                    />
                  ))}
                </Pie>
                <Legend
                  verticalAlign="bottom"
                  align="left"
                  width={200}
                  layout="vertical"
                  iconSize={5}
                  iconType="square"
                  payload={filteredData.map((entry: any) => ({
                    value: entry.name,
                    type: "square",
                    color:
                      REGION_COLORS[entry.name as keyof typeof REGION_COLORS] ||
                      "#BEF264",
                  }))}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: isDarkMode ? "#2D3748" : "#FFFFFF", // Dark gray or white background
                    borderColor: isDarkMode ? "#2D3748" : "#E2E8F0", // Border color based on mode
                    color: isDarkMode ? "#FFFFFF" : "#000000", // Text color based on mode
                  }}
                  itemStyle={{
                    color: isDarkMode ? "#FFFFFF" : "#000000", // Text color for tooltip items
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-left py-10">{t("No Orders Found")}</p>
          )}
        </div>
      </div>
    </div>
  );
}
