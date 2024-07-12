import React from "react";
import { PieChart, Pie, Tooltip, Cell, ResponsiveContainer } from "recharts";
import { moroccanRegionsAndCities } from "../../services/moroccanRegionsAndCities";
import { OrderType } from "../../Types/types";

const COLORS = [
  "#5BC0EB", // Sky Blue
  "#F45B69", // Coral Pink
  "#FDE74C", // Yellow
  "#9BC53D", // Lime Green
  "#F7CAC9", // Light Pink
  "#4F6D7A", // Slate Gray
  "#2A363B", // Charcoal
  "#FF6F61", // Light Red
  "#6B5B95", // Purple
  "#88B04B", // Olive Green

  "#92A8D1", // Light Blue
  "#FF6F61", // Light Red
];

const getAllRegions = (regionsData: any) => {
  return regionsData.regions.flatMap((region: any) => region.name);
};
const regions = getAllRegions(moroccanRegionsAndCities);

//
//
export default function RegionsPieChart({ orders }: { orders: OrderType[] }) {
  const data = regions.map((region: any) => {
    const regionsOrders = orders.filter(
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
  console.log(data);

  // Filter out regions with zero orders
  const filteredData = data.filter((entry: any) => entry.orders > 0);
  return (
    <div className="col-span-2 bg-white p-5">
      <h2 className="text-[20px] font-semibold">
        Summary of Orders by Moroccan Regions
      </h2>
      <div className=" flex items-center justify-center ">
        <div className="w-full h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                innerRadius={55}
                data={filteredData}
                dataKey="orders"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={85}
                fill="#8884d8"
                label
              >
                {filteredData.map((entry: any, index: number) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="">
          {filteredData.map((entry: any, index: number) => (
            <div
              key={`indicator-${index}`}
              className=" flex items-center mb-1 text-[12px] "
            >
              <div
                className="w-6 h-4"
                style={{
                  backgroundColor: COLORS[index],
                  marginRight: 5,
                }}
              ></div>
              <span className=" ">{entry.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
