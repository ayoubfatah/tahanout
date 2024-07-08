// src/components/Dashboard.js
import React from "react";
import {
  HiOutlineBanknotes,
  HiOutlineShoppingBag,
  HiOutlineTruck,
  HiOutlineUserGroup,
} from "react-icons/hi2";
import useCountUp from "../hooks/useCountUp";

const Dashboard = () => {
  return (
    <>
      <div className="text-[30px] font-semibold mb-7">Dashboard</div>
      <div className="min-h-screen  flex">
        <div className="flex-1 ">
          <div className="grid  grid-cols-4 grid-rows-[auto_300px_auto] gap-5">
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
            <div className="bg-white p-5 col-span-2 ">
              <h2 className="text-xl font-semibold text-gray-700 mb-2"></h2>
              <p className="text-gray-600">222</p>
            </div>
            <div className="bg-white p-5 col-span-2">
              <h2 className="text-xl font-semibold text-gray-700 mb-2">
                Top Products:
              </h2>
              <p className="text-gray-700">222</p>
            </div>
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
  const animatedValue = useCountUp(value, 1000);

  return (
    <div className="bg-white px-4 py-5 flex gap-5 shadow-sm rounded-md items-center hover:scale-[1.03] duration-300 transition-all">
      <div
        className={`bg-${iconColor}-100 text-${iconColor}-600 p-4 rounded-full`}
      >
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
