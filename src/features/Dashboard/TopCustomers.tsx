import React from "react";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { formatCurrency } from "../../utils/helpers";
import { useOrders } from "../Orders/useOrders";
import { CustomersType, OrderType } from "../../Types/types";
import { useCustomers } from "../Customers/useCutomers";
import TopCustomersRow from "./TopCustomersRow";
import Spinner from "../../ui/Spinner";

export default function TopCustomers({ orders }: { orders: OrderType[] }) {
  const { customers, isLoading: customersLoading } = useCustomers();

  const customerData = customers?.map((customer: CustomersType) => {
    const customerOrders = orders?.filter(
      (order: OrderType) => order.customerId === customer.id
    );
    const totalOrders = customerOrders?.length || 0;
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

  if (sortedTopCustomers?.length === 0)
    return <div className="p-5">No customers found</div>;
  return (
    <div className="bg-white p-5 relative col-span-2 flex flex-col gap-3 rounded-md duration-300 transition-all">
      <h2 className="text-xl font-semibold text-gray-700 py w-full bg-white sticky top-0">
        Top Customers:
      </h2>

      <div className="overflow-y-scroll">
        {sortedTopCustomers?.map((customer: any, i: number) => (
          <TopCustomersRow
            key={customer.customerId}
            customer={customer}
            i={i}
          />
        ))}
      </div>
    </div>
  );
}
