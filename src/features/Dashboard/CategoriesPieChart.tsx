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
import { CATEGORIES, CATEGORY_COLORS } from "../../services/Categories";
import { filteredByDates, getDateInterval } from "../../utils/helpers";
import { eachDayOfInterval } from "date-fns";

const getCategories = CATEGORIES;
//

//
export default function CategoriesPieChart({
  orders,
  datesFromDatePicker,
  numDays,
}: {
  orders: OrderType[];
  datesFromDatePicker: any;
  numDays?: any;
}) {
  const { start, end } = getDateInterval(numDays);

  const allDates = datesFromDatePicker || eachDayOfInterval({ start, end });

  const dataBasedOnDate = allDates.map((date: any) => {
    const ordersDate = filteredByDates(orders, date);

    return ordersDate;
  });
  const flattenedData = dataBasedOnDate.flatMap((arr: Array<any>) => arr);

  const data = getCategories.map((category: any) => {
    const categoriesOrders = flattenedData.filter(
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
    <div className="col-span-2 bg-white dark:bg-gray-800 p-5">
      <h2 className="text-[20px] font-semibold">
        Summary of Orders by Products Categories
      </h2>
      {filteredData.length ? (
        <div className=" flex items-center overflow-hidden justify-center ">
          <div className="w-full   h-[300px]">
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
                      fill={
                        CATEGORY_COLORS[
                          entry.name as keyof typeof CATEGORY_COLORS
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
                  iconSize={10}
                  iconType="square"
                  payload={filteredData.map((entry) => ({
                    value: entry.name,
                    type: "square",
                    color:
                      CATEGORY_COLORS[
                        entry.name as keyof typeof CATEGORY_COLORS
                      ],
                  }))}
                />

                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      ) : (
        <p className="text-left py-10">No Orders Found</p>
      )}
    </div>
  );
}
