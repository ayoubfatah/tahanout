import React from "react";
import { PieChart, Pie, Tooltip, Cell, ResponsiveContainer } from "recharts";

const data = [
  { name: "Tanger-Tetouan-Al Hoceima", orders: 2400 },
  { name: "Oriental", orders: 1200 },
  { name: "Fès-Meknès", orders: 800 },
  { name: "Rabat-Salé-Kénitra", orders: 1600 },
  { name: "Béni Mellal-Khénifra", orders: 900 },
  { name: "Casablanca-Settat", orders: 600 },
  { name: "Marrakech-Safi", orders: 300 },
  { name: "Drâa-Tafilalet", orders: 0 },
  { name: "Souss-Massa", orders: 700 },
  { name: "Guelmim-Oued Noun", orders: 0 },
  { name: "Laâyoune-Sakia El Hamra", orders: 0 },
  { name: "Dakhla-Oued Ed-Dahab", orders: 0 },
];

const COLORS = [
  "#FF6633",
  "#FFB399",
  "#FF33FF",
  "#69690f",
  "#00B3E6",
  "#E6B333",
  "#3366E6",
  "#B34D4D",
  "#80B300",
  "#809900",
  "#E6B3B3",
  "#6680B3",
];

export default function RegionsPieChart() {
  // Filter out regions with zero orders
  const filteredData = data.filter((entry) => entry.orders > 0);

  return (
    <div className="col-span-2 bg-white p-5">
      <h2 className="text-[20px] font-semibold">
        Summary of Orders by Moroccan Regions
      </h2>
      <div className=" flex items-center justify-center ">
        <div className="w-full h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                innerRadius={50}
                data={filteredData}
                dataKey="orders"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={90}
                fill="#8884d8"
                label
              >
                {filteredData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="ml-5 ">
          {filteredData.map((entry, index) => (
            <div
              key={`indicator-${index}`}
              className="flex items-center mb-1 text-xs "
            >
              <div
                className="w-6 h-4"
                style={{
                  backgroundColor: COLORS[index % COLORS.length],
                  marginRight: 5,
                }}
              ></div>
              <span>{entry.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
