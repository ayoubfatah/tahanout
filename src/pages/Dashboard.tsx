// src/components/Dashboard.js
import React from "react";
import {
  HiOutlineBanknotes,
  HiOutlineShoppingBag,
  HiOutlineTruck,
  HiOutlineUserGroup,
} from "react-icons/hi2";
import useCountUp from "../hooks/useCountUp";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { formatCurrency } from "../utils/helpers";
import TopCustomers from "../features/Dashboard/TopCustomers";
import TopProducts from "../features/Dashboard/TopProducts";
import TodaysOrders from "../features/Dashboard/TodaysOrders";
import OrdersChart from "../features/Dashboard/OrdersChart";

const colorClasses: any = {
  green: "bg-green-100 text-green-600",
  blue: "bg-blue-100 text-blue-600",
  indigo: "bg-indigo-100 text-indigo-600",
  teal: "bg-teal-100 text-teal-600",
};

const Dashboard = () => {
  return (
    <>
      <div className="text-[30px] font-semibold mb-7">Dashboard</div>
      <div className="min-h-screen flex">
        <div className="flex-1">
          <div className="grid grid-cols-4 grid-rows-[auto_auto_300px_300px_auto] gap-5">
            <OverviewCard
              iconColor="green"
              icon={<HiOutlineBanknotes size={30} />}
              title="Total Sales"
              value={25000}
              format={(value) => `$${value.toLocaleString()}`}
            />
            <OverviewCard
              icon={<HiOutlineShoppingBag size={30} />}
              iconColor="blue"
              title="Total Orders"
              value={320}
              format={(value) => `${value.toLocaleString()}`}
            />
            <OverviewCard
              icon={<HiOutlineUserGroup size={30} />}
              iconColor="indigo"
              title="Total Customers"
              value={150}
            />
            <OverviewCard
              icon={<HiOutlineTruck size={30} />}
              iconColor="teal"
              title="Delivery Rate"
              value={80}
              format={(value) => `${value}%`}
            />

            {/* chart */}
            <div className="col-span-4  bg-white my-10 px-5 py-5">
              <OrdersChart />
            </div>

            {/* today orders */}
            <TodaysOrders />
            <TopCustomers />
            <TopProducts />
          </div>
        </div>
      </div>
    </>
  );
};

const OverviewCard = ({
  title,
  value,
  icon,
  iconColor,
  format = (value) => value,
}: {
  title: string;
  value: number;
  icon: React.ReactNode;
  iconColor: string;
  format?: (value: number) => string | number;
}) => {
  const animatedValue = useCountUp(value, 800);

  return (
    <div className="bg-white px-4 py-5 flex gap-5 shadow-sm rounded-md items-center hover:scale-[1.03] duration-300 transition-all">
      <div className={`${colorClasses[iconColor]} p-4 rounded-full`}>
        {icon}
      </div>
      <div>
        <h2 className="text-[15px] font-semibold text-gray-500 mb-1">
          {title}
        </h2>
        <p className="text-gray-700 font-semibold text-[20px]">
          {format(animatedValue)}
        </p>
      </div>
    </div>
  );
};

export default Dashboard;
