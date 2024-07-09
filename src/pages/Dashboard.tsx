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
import { OverviewCard } from "../ui/OverviewCard";
import Overview from "../features/Dashboard/Overview";
import Filter from "../ui/Filter";

const Dashboard = () => {
  return (
    <>
      <div className="flex items-center justify-between gap-3 mb-7">
        <div className="text-[30px] font-semibold ">Dashboard</div>
        <Filter
          filterField={"last"}
          options={[
            { label: "last 7 days", value: "7" },
            { label: "last 30 days", value: "30" },
            { label: "last 90 days", value: "90" },
          ]}
        />
      </div>
      <div className="min-h-screen flex">
        <div className="flex-1">
          <div className="grid grid-cols-4 grid-rows-[auto_auto_300px_300px_auto] gap-5">
            <Overview />
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

export default Dashboard;
