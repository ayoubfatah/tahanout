import React from "react";
import { OverviewCard } from "../../ui/OverviewCard";
import {
  HiOutlineBanknotes,
  HiOutlineShoppingBag,
  HiOutlineTruck,
  HiOutlineUserGroup,
} from "react-icons/hi2";
import { useOrders } from "../Orders/useOrders";
import { eachDayOfInterval, isSameDay, subDays } from "date-fns";

export default function Overview() {
  const { orders } = useOrders();

  //   total sales
  const numDays = 15; // You can change this to any number of days you want to display
  const allDates = eachDayOfInterval({
    start: subDays(new Date(), numDays - 1),
    end: new Date(),
  });

  const totalSalesBasedOnDate = allDates.map((date) => {
    const totalOrdersOfDate = orders
      ?.filter((order) => isSameDay(date, new Date(order.createdAt)))
      ?.filter((order) => order.status === "delivered")
      ?.reduce((acc, order) => {
        return acc + order.totalPrice;
      }, 0);
    return totalOrdersOfDate;
  });
  const totalSales = totalSalesBasedOnDate?.reduce(
    (acc, curr) => acc + curr,
    0
  );

  //   total orders
  const totalOrdersBasedOnDate = allDates?.map((date) => {
    const totalOrdersOfDate = orders
      ?.filter((order) => isSameDay(date, new Date(order.createdAt)))
      ?.reduce((acc, order) => acc + order.quantity, 0);
    return totalOrdersOfDate;
  });
  const totalOrders = totalOrdersBasedOnDate?.reduce((acc, curr) => acc + curr);

  //   total confirmed orders
  const totalConfirmedOrdersBasedOnDate = allDates?.map((date) => {
    const totalOrdersOfDate = orders
      ?.filter((order) => isSameDay(date, new Date(order.createdAt)))
      ?.filter((order) => order.status === "delivered")
      ?.reduce((acc, order) => acc + order.quantity, 0);
    return totalOrdersOfDate;
  });
  const totalConfirmedOrders = totalConfirmedOrdersBasedOnDate?.reduce(
    (acc, curr) => acc + curr
  );

  const DeliveryRate = Math.ceil((totalConfirmedOrders / totalOrders) * 100);

  return (
    <>
      <OverviewCard
        iconColor="green"
        icon={<HiOutlineBanknotes size={30} />}
        title="Total Sales"
        value={totalSales}
        format={(value) => `$${value.toLocaleString()}`}
      />
      <OverviewCard
        icon={<HiOutlineShoppingBag size={30} />}
        iconColor="blue"
        title="Total Orders"
        value={totalOrders}
      />
      <OverviewCard
        icon={<HiOutlineUserGroup size={30} />}
        iconColor="indigo"
        title="Confirmed Orders"
        value={totalConfirmedOrders}
      />
      <OverviewCard
        icon={<HiOutlineTruck size={30} />}
        iconColor="teal"
        title="Delivery Rate"
        value={DeliveryRate}
        format={(value) => `${value}%`}
      />
    </>
  );
}
