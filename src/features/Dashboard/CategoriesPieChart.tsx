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
import { CATEGORIES } from "../../services/Categories";
const COLORS = [
  "#60a5fa", // Light Blue
  "#f97316", // Orange (kept as is for contrast)
  "#a855f7", // Light Purple
  "#fde047", // Light Yellow
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

const getCategories = CATEGORIES;
//
//
export default function CategoriesPieChart({
  orders,
}: {
  orders: OrderType[];
}) {
  const data = getCategories.map((category: any) => {
    const categoriesOrders = orders.filter(
      (order: any) => order.products.category === category
    );
    console.log(categoriesOrders);

    return {
      name: category,
      orders: categoriesOrders.reduce(
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
        Summary of Orders by Products Categories
      </h2>
      <div className=" flex items-center justify-center ">
        <div className="w-full h-[300px]">
          <ResponsiveContainer width="100%" height={290}>
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
                paddingAngle={3}
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
