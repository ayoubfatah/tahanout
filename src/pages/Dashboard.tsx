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
          <div className="grid grid-cols-4 grid-rows-[auto_400px_300px_300px_auto] gap-5">
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
            <div className="col-span-4 bg-white rounded-md"></div>
            {/* today orders */}
            <div className="bg-white p-5 col-span-4 flex flex-col gap-3 overflow-x-scroll rounded-md duration-300 transition-all">
              <h2 className="text-xl font-semibold text-gray-700">
                {" "}
                Today's Orders
              </h2>
            </div>

            {/* customers */}
            <TopCustomers />
            {/* top products */}
            <div className="bg-white p-5 col-span-2 flex flex-col gap-3 overflow-x-scroll rounded-md duration-300 transition-all">
              <h2 className="text-xl font-semibold text-gray-700 mb-2">
                Top Products:
              </h2>
              <div className="flex items-center justify-between hover:bg-gray-100">
                <img
                  className="bg-gray-300 h-10 w-10 rounded-full"
                  src="https://jmvbwhvpdounmufynkwd.supabase.co/storage/v1/object/public/productImages/edb21202-26e9-4192-a612-784d1d788847-2.jpg"
                  alt=""
                />
                <div className="flex justify-center flex-col text-[12px]">
                  <span className="text-gray-500">Air Pods Pro</span>
                  <span className="text-gray-600">$100</span>
                </div>
                <div className="flex justify-center flex-col text-[12px]">
                  <span className="text-gray-400">Quantity</span>
                  <span className="text-gray-500">100</span>
                </div>
                <div className="flex justify-center flex-col text-[12px]">
                  <span className="text-gray-400">Orders</span>
                  <span className="text-gray-500">400</span>
                </div>
                <div className="flex justify-center flex-col text-[12px]">
                  <span className="text-gray-400">Warehouse</span>
                  <span className="text-gray-500">Ouarzazate</span>
                </div>
                <div>
                  <HiOutlineDotsVertical color="gray" size={20} />
                </div>
              </div>
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
