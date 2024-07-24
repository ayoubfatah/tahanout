import React from "react";
import { t } from "i18next";
import TopCustomersRow from "./TopCustomersRow";
import Spinner from "../../ui/Spinner";
import { CustomersType, OrderType } from "../../Types/types";
import { useCustomers } from "../Customers/useCutomers";

export default function TopCustomers({ orders }: { orders: OrderType[] }) {
  const { customers, isLoading: customersLoading } = useCustomers();

  const customerData = customers?.map((customer: CustomersType) => {
    const customerOrders = orders?.filter(
      (order: OrderType) => order.customerId === customer.id
    );
    const totalOrders = customerOrders
      ?.map((order) => order.quantity)
      .reduce((acc, curr) => acc + curr, 0);
    const totalSpent =
      customerOrders
        ?.map((order) => order.totalPrice)
        .reduce((acc, curr) => acc + curr, 0) || 0;

    return {
      customerId: customer.id,
      fullName: customer.fullName,
      city: customer.city,
      totalOrders,
      totalSpent,
    };
  });

  const sortedTopCustomers = customerData
    ?.sort((a: any, b: any) => b.totalSpent - a.totalSpent)
    .slice(0, 10);

  if (customersLoading) return <Spinner />;
  if (sortedTopCustomers?.length === 0)
    return <div className="p-5">{t("No customers found")}</div>;

  return (
    <div className="bg-white dark:bg-gray-800 relative col-span-2 flex flex-col gap-3 rounded-md">
      <h2 className="text-xl px-2 py-3 font-semibold text-gray-700 dark:text-gray-200 dark:bg-gray-800 w-full bg-white sticky top-0">
        {t("Top Customers")}:
      </h2>

      <div className="overflow-y-scroll">
        {sortedTopCustomers?.map((customer: any, i: number) => (
          <TopCustomersRow
            key={customer.customerId}
            customer={customer}
            customerData={customers?.filter(
              (test: any) => test.id === customer.customerId
            )}
            i={i}
            isLast={i === sortedTopCustomers.length - 1}
          />
        ))}
      </div>
    </div>
  );
}
