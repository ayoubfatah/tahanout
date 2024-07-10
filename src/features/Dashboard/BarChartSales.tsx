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

const data = [
  { month: "Jan", sales: 4000, profit: 2400 },
  { month: "Feb", sales: 3000, profit: 1398 },
  { month: "Mar", sales: 5000, profit: 3000 },
  { month: "Apr", sales: 4500, profit: 2780 },
  { month: "May", sales: 6000, profit: 3900 },
  { month: "Jun", sales: 5500, profit: 3300 },
  { month: "Jul", sales: 7000, profit: 4300 },
];

const BarChartSales = () => {
  return (
    <div className="col-span-2 bg-white p-5">
      <h2 className="text-[20px] font-semibold">
        Monthly Sales and Profit Overview
      </h2>

      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip
            formatter={(value, name: string) => [
              `$${value}`,
              typeof name === "string"
                ? name.charAt(0).toUpperCase() + name.slice(1)
                : "",
            ]}
          />
          <Legend />
          <Bar dataKey="sales" fill="#ffd700" name="Sales" />
          <Bar dataKey="profit" fill="#3981e6" name="Profit" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarChartSales;
