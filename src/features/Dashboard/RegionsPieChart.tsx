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
const COLORS = [
  "#60a5fa", // Light Blue
  "#f97316", // Orange (kept as is for contrast)
  "#a855f7", // Light Purple
  "#c8af2f", // Light Yellow
  "#84cc16", // Light Green (kept as is)
  "#f87171", // Light Red
  "#fdba74", // Light Orange
  "#a3e635", // Lighter Green
  "#4ade80", // Lighter Green
  "#5eead4", // Light Teal
  "#c084fc", // Lighter Purple
  "#ef4444", // Red (kept as is for contrast)
  "#facc15", // Lighter Yellow
  "#22c55e", // Green (kept as is)
  "#2dd4bf", // Lighter Teal
  "#60a5fa", // Light Blue (repeated)
];
const getAllRegions = (regionsData: any) => {
  return regionsData.regions.flatMap((region: any) => region.name);
};
const regions = getAllRegions(moroccanRegionsAndCities);

//
//
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

  const allDates = datesFromDatePicker || eachDayOfInterval({ start, end });

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
    <div className="col-span-2 bg-white p-5">
      <h2 className="text-[20px] font-semibold">
        Summary of Orders by Moroccan Regions
      </h2>
      <div className=" flex items-center overflow-hidden justify-center ">
        <div className="w-full h-[300px]">
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
                paddingAngle={5}
              >
                {filteredData.map((entry: any, index: number) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index]} />
                ))}
              </Pie>
              <Legend
                verticalAlign="bottom"
                align="left"
                width={200}
                layout="vertical"
                iconSize={5}
                iconType="square"
              />

              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
