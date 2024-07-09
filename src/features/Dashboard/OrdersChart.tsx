import { eachDayOfInterval, format, isSameDay, subDays } from "date-fns";
import {
    Area,
    AreaChart,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";
import { useOrders } from "../Orders/useOrders";

export default function OrdersChart() {
  const { orders } = useOrders();
  const numDays = 15; // You can change this to any number of days you want to display
  const allDates = eachDayOfInterval({
    start: subDays(new Date(), numDays - 1),
    end: new Date(),
  });

  const ordersChartData = allDates.map((date) => {
    const dateString = format(date, "MMM dd");
    const totalOrdersOfDate = orders
      ?.filter((order) => isSameDay(date, new Date(order.createdAt)))
      ?.reduce((acc, curr) => acc + curr.quantity, 0);

    const totalConfirmedOrdersOfDate = orders
      ?.filter((order) => isSameDay(date, new Date(order.createdAt)))
      ?.filter((order) => order.status === "delivered")
      ?.reduce((acc, curr) => acc + curr.quantity, 0);

    return {
      label: dateString,
      totalOrders: totalOrdersOfDate || 0,
      confirmedOrders: totalConfirmedOrdersOfDate || 0,
    };
  });

  return (
    <div>
      <h1 className="px-4 py-3 text-gray-800 font-semibold text-[20px]">
        Orders from {format(allDates.at(0) ?? new Date(), "MMM dd yyyy")} -{" "}
        {format(allDates.at(0) ?? new Date(), "MMM dd yyyy")}{" "}
      </h1>
      <ResponsiveContainer width="100%" height={400}>
        <AreaChart
          data={ordersChartData}
          margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="2 2" />
          <XAxis
            dataKey="label"
            tickSize={0.9}
            padding={{ left: 10, right: 10 }}
            tick={{ fontSize: 14 }}
          />
          <YAxis
            tick={{ fontSize: 13 }}
            dataKey="totalOrders"
            name="Total Orders"
            domain={[0, 400]}
            scale="auto"
            type="number"
          />
          <Tooltip />
          <Area
            dot={{ fill: "#599cfa", strokeWidth: 1 }}
            type="monotone"
            dataKey="totalOrders"
            name="Total Orders"
            stroke="#4f46e5"
            fill="#c1dbff"
            strokeWidth={1}
          />
          <Area
            dot={{ fill: "#4e9c8b", strokeWidth: 1 }}
            type="monotone"
            dataKey="confirmedOrders"
            name="Delivered Orders"
            stroke="#4e9c8b"
            fill="#ccfbf1"
            strokeWidth={1}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
