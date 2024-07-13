import { eachDayOfInterval, subDays } from "date-fns";
import {
  HiOutlineBanknotes,
  HiOutlineCheck,
  HiOutlineShoppingBag,
  HiOutlineTruck,
  HiOutlineXCircle,
  HiOutlineCurrencyDollar,
  HiOutlineChartBar,
  HiOutlineChartPie,
  HiOutlineShoppingCart,
  HiOutlineDocumentCheck,
  HiOutlineArchiveBoxXMark,
  HiOutlineWallet,
  HiOutlineCheckCircle,
  HiOutlineArrowTrendingUp,
} from "react-icons/hi2";
import { OrderType } from "../../Types/types";
import { OverviewCard } from "../../ui/OverviewCard";
import { filteredByDates } from "../../utils/helpers";
import { HiOutlineCash, HiOutlineClipboardCheck } from "react-icons/hi";

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

const calculateRate = (delivered: number, total: number) => {
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

  // delivered
  const totalDeliveredBasedOnDate = allDates.map((date) => {
    const ordersOfDate = filteredByDates(orders, date);
    return calculateTotalQuantity(ordersOfDate, "delivered");
  });
  const totalDelivered = totalDeliveredBasedOnDate.reduce(
    (acc, curr) => acc + curr,
    0
  );

  // confirmed
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

  // cancelled
  const totalCancelledBasedOnDate = allDates.map((date) => {
    const ordersOfDate = filteredByDates(orders, date)
      .filter((order: OrderType) => order.status === "canceled")
      .map((order: OrderType) => order.quantity)
      .reduce((acc: number, curr: number) => acc + curr, 0);

    return ordersOfDate;
  });

  //

  const totalCancelled = totalCancelledBasedOnDate.reduce(
    (acc, curr) => acc + curr
  );

  // total spent
  const totalSpentBasedOnDate = allDates.map((date) => {
    const ordersOfDate = filteredByDates(orders, date);
    return ordersOfDate
      .filter((order: OrderType) => order.status === "delivered")
      .reduce(
        (acc: number, curr: any) =>
          acc + curr.products.originalPrice * curr.quantity,
        0
      );
  });
  const totalSpent = totalSpentBasedOnDate.reduce((acc, curr) => acc + curr, 0);


  const totalProfits = totalSales - totalSpent;

  const deliveryRate = calculateRate(totalDelivered, totalOrders);
  const confirmationRate = calculateRate(totalConfirmed, totalOrders);

  return (
    <>
      <OverviewCard
        numDays={numDays}
        iconColor="bg-yellow-100 text-yellow-600"
        icon={<HiOutlineBanknotes size={30} />}
        title="Total Sales"
        value={totalSales}
        format={true}
      />
      <OverviewCard
        numDays={numDays}
        icon={<HiOutlineShoppingBag size={30} />}
        iconColor="bg-blue-100 text-blue-600"
        title="Total Orders"
        value={totalOrders}
      />
      <OverviewCard
        numDays={numDays}
        icon={<HiOutlineDocumentCheck size={30} />}
        iconColor="bg-green-100 text-green-600"
        title="Confirmed Orders"
        value={totalConfirmed}
      />
      <OverviewCard
        numDays={numDays}
        icon={<HiOutlineTruck size={30} />}
        iconColor="bg-teal-100 text-teal-600"
        title="Delivered Orders"
        value={totalDelivered}
      />

      <OverviewCard
        numDays={numDays}
        icon={<HiOutlineWallet size={30} />}
        iconColor="bg-yellow-100 text-yellow-600"
        title="Total Profits"
        value={totalProfits}
        format={true}
      />
      <OverviewCard
        numDays={numDays}
        icon={<HiOutlineArchiveBoxXMark size={30} />}
        iconColor="bg-red-100 text-red-600"
        title="Canceled Orders"
        value={totalCancelled}
      />
      <OverviewCard
        numDays={numDays}
        icon={<HiOutlineCheckCircle size={30} />}
        iconColor="bg-pink-100 text-pink-600"
        title="Confirmation Rate"
        value={confirmationRate}
        percentage={true}
      />
      <OverviewCard
        numDays={numDays}
        icon={<HiOutlineArrowTrendingUp size={30} />}
        iconColor="bg-purple-100 text-purple-600"
        title="Delivery Rate"
        value={deliveryRate}
        percentage={true}
      />
    </>
  );
}