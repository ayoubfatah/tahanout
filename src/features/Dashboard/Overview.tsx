import React from "react";
import { OverviewCard } from "../../ui/OverviewCard";
import {
  HiOutlineBanknotes,
  HiOutlineCheck,
  HiOutlineShoppingBag,
  HiOutlineTruck,
  HiOutlineUserGroup,
} from "react-icons/hi2";
import { useOrders } from "../Orders/useOrders";
import { eachDayOfInterval, isSameDay, subDays } from "date-fns";
import { useSearchParams } from "react-router-dom";

export default function Overview() {
  const { orders } = useOrders();
  const [searchParams] = useSearchParams();

  const numDays = Number(searchParams.get("last")) || 15;

  //   total sales

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
  const totalSales =
    totalSalesBasedOnDate?.reduce((acc, curr) => acc + curr, 0) || 0;

  //   total orders
  const totalOrdersBasedOnDate = allDates?.map((date) => {
    const totalOrdersOfDate = orders
      ?.filter((order) => isSameDay(date, new Date(order.createdAt)))
      ?.reduce((acc, order) => acc + order.quantity, 0);
    return totalOrdersOfDate;
  });
  const totalOrders =
    totalOrdersBasedOnDate?.reduce((acc, curr) => acc + curr) || 0;

  //   total delivered orders
  const totalDeliveredBasedOnDate = allDates?.map((date) => {
    const totalOrdersOfDate = orders
      ?.filter((order) => isSameDay(date, new Date(order.createdAt)))
      ?.filter((order) => order.status === "delivered")
      ?.reduce((acc, order) => acc + order.quantity, 0);
    return totalOrdersOfDate;
  });
  const totalDelivered =
    totalDeliveredBasedOnDate?.reduce((acc, curr) => acc + curr) || 0;

  const DeliveryRate = Math.ceil((totalDelivered / totalOrders) * 100) || 0;

  //   confirmed  orders

  const totalConfirmedBasedOnDate = allDates?.map((date) => {
    const totalOrdersOfDate = orders
      ?.filter((order) => isSameDay(date, new Date(order.createdAt)))
      ?.filter((order) => order.status !== "pending")
      .filter((order) => order.status !== "cancelled")
      ?.reduce((acc, order) => acc + order.quantity, 0);

    return totalOrdersOfDate;
  });

  const totalConfirmed =
    totalConfirmedBasedOnDate?.reduce((acc, curr) => acc + curr) || 0;

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
