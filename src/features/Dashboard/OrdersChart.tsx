import {
  eachDayOfInterval,
  eachMonthOfInterval,
  format,
  isSameDay,
  subDays,
} from "date-fns";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { OrderType } from "../../Types/types";
import { formatCurrency, getDateInterval } from "../../utils/helpers";

export default function OrdersChart({
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

  const ordersChartData = allDates.map((date: any) => {
    const dateString = format(date, "MMM dd");
    const totalOrdersOfDate = orders
      ?.filter((order) => isSameDay(date, new Date(order.createdAt)))
      ?.reduce((acc, curr) => acc + curr.quantity, 0);

    const totalConfirmedOrdersOfDate = orders
      ?.filter((order) => isSameDay(date, new Date(order.createdAt)))
      ?.filter((order) => order.status === "delivered")
      ?.reduce((acc, curr) => acc + curr.quantity, 0);

    const totalPriceOfDate =
      orders
        ?.filter((order) => isSameDay(date, new Date(order.createdAt)))
        .filter((order) => order.status === "delivered")
        .reduce((acc, curr) => acc + curr.totalPrice, 0) || 0;
    return {
      label: dateString,
      totalOrders: totalOrdersOfDate || 0,
      confirmedOrders: totalConfirmedOrdersOfDate || 0,
      totalSales: formatCurrency(totalPriceOfDate) || 0,
    };
  });

  return (
    <div>
      {numDays !== "all" && (
        <h2 className="px-4 py-3 text-gray-800 font-semibold text-[20px]">
          Stats from {format(allDates.at(0) ?? new Date(), "MMM dd yyyy")} -{" "}
          {format(allDates.at(-1) ?? new Date(), "MMM dd yyyy")}{" "}
        </h2>
      )}
      <ResponsiveContainer width="100%" height={400}>
        <AreaChart
          data={ordersChartData}
          margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="2 2" />
          <XAxis
            dataKey="label"
            tickSize={0.9}
            tick={{ fontSize: 14, dy: 10 }}
          />
          <YAxis
            tick={{ fontSize: 13 }}
            dataKey="totalOrders"
            name="Total Orders"
            scale="auto"
            type="number"
          />
          <YAxis
            yAxisId="right"
            orientation="right"
            dataKey="totalSales"
            name="Total Sales"
            domain={[0, "auto"]}
            scale="auto"
            type="number"
          />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="totalOrders"
            name="Total Orders"
            stroke="#4f46e5"
            fill="#c1dbff"
            strokeWidth={1}
          />
          <Area
            type="monotone"
            dataKey="confirmedOrders"
            name="Delivered Orders"
            stroke="#4e9c8b"
            fill="#ccfbf1"
            strokeWidth={1}
          />
          <Area dataKey="totalSales" name="Total Sales" stroke="#ffd700" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
