import { eachDayOfInterval, subDays } from "date-fns";
import {
  HiOutlineBanknotes,
  HiOutlineCheck,
  HiOutlineShoppingBag,
  HiOutlineTruck,
} from "react-icons/hi2";
import { OrderType } from "../../Types/types";
import { OverviewCard } from "../../ui/OverviewCard";
import { filteredByDates } from "../../utils/helpers";

type OverviewProps = {
  orders: OrderType[];
  numDays: number;
};

const calculateTotalSales = (orders: OrderType[], status: string) => {
  return orders
    .filter((order) => order.status === status)
    .reduce((acc, order) => acc + order.totalPrice, 0);
};

const calculateTotalQuantity = (orders: OrderType[], status?: string) => {
  return orders
    .filter((order) => (status ? order.status === status : true))
    .reduce((acc, order) => acc + order.quantity, 0);
};

const calculateDeliveryRate = (delivered: number, total: number) => {
  return total > 0 ? Math.ceil((delivered / total) * 100) : 0;
};

export default function Overview({ orders, numDays }: OverviewProps) {
  const allDates = eachDayOfInterval({
    start: subDays(new Date(), numDays - 1),
    end: new Date(),
  });

  const totalSalesBasedOnDate = allDates.map((date) => {
    const ordersOfDate = filteredByDates(orders, date);
    return calculateTotalSales(ordersOfDate, "delivered");
  });
  const totalSales = totalSalesBasedOnDate.reduce((acc, curr) => acc + curr, 0);

  const totalOrdersBasedOnDate = allDates.map((date) => {
    const ordersOfDate = filteredByDates(orders, date);
    return calculateTotalQuantity(ordersOfDate);
  });
  const totalOrders = totalOrdersBasedOnDate.reduce(
    (acc, curr) => acc + curr,
    0
  );

  const totalDeliveredBasedOnDate = allDates.map((date) => {
    const ordersOfDate = filteredByDates(orders, date);
    return calculateTotalQuantity(ordersOfDate, "delivered");
  });
  const totalDelivered = totalDeliveredBasedOnDate.reduce(
    (acc, curr) => acc + curr,
    0
  );

  const deliveryRate = calculateDeliveryRate(totalDelivered, totalOrders);

  const totalConfirmedBasedOnDate = allDates.map((date) => {
    const ordersOfDate = filteredByDates(orders, date);
    return calculateTotalQuantity(
      ordersOfDate.filter(
        (order: OrderType) =>
          order.status !== "pending" && order.status !== "cancelled"
      )
    );
  });
  const totalConfirmed = totalConfirmedBasedOnDate.reduce(
    (acc, curr) => acc + curr,
    0
  );

  return (
    <>
      <OverviewCard
        numDays={numDays}
        iconColor="yellow"
        icon={<HiOutlineBanknotes size={30} />}
        title="Total Sales"
        value={totalSales}
        format={true}
      />
      <OverviewCard
        numDays={numDays}
        icon={<HiOutlineShoppingBag size={30} />}
        iconColor="blue"
        title="Total Orders"
        value={totalOrders}
      />
      <OverviewCard
        numDays={numDays}
        icon={<HiOutlineCheck size={30} />}
        iconColor="green"
        title="Confirmed Orders"
        value={totalConfirmed}
      />
      <OverviewCard
        numDays={numDays}
        icon={<HiOutlineTruck size={30} />}
        iconColor="teal"
        title="Delivered Orders"
        value={totalDelivered}
      />
    </>
  );
}
