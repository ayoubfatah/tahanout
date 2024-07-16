import React from "react";
import {
  PieChart,
  Pie,
  Tooltip,
  Cell,
  ResponsiveContainer,
  Legend,
} from "recharts";

import { OrderType } from "../../Types/types";
import { CATEGORIES } from "../../services/Categories";
const COLORS = [
  "#3B82F6", // Sky Blue
  "#EF4444", // Light Red
  "#10B981", // Emerald Green
  "#8B5CF6", // Lavender
  "#F59E0B", // Amber
  "#6B7280", // Cool Gray
  "#EC4899", // Pink
  "#0EA5E9", // Light Blue
  "#D946EF", // Fuchsia
  "#84CC16", // Lime Green
  "#F97316", // Orange
  "#14B8A6", // Teal
  "#8B5CF6", // Purple
  "#D97706", // Light Brown
  "#059669", // Sea Green
  "#4B5563", // Slate Gray
  "#60A5FA", // Lighter Blue
  "#FB7185", // Salmon
  "#34D399", // Mint Green
  "#A78BFA", // Light Purple
  "#FBBF24", // Golden Yellow
  "#9CA3AF", // Light Gray
  "#F472B6", // Light Pink
  "#38BDF8", // Sky Blue (lighter)
  "#A855F7", // Bright Purple
  "#BEF264", // Lime Yellow
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
