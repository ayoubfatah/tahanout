// src/components/Dashboard.js
import { BarChart, PieChart } from "recharts";
import OrdersChart from "../features/Dashboard/OrdersChart";
import Overview from "../features/Dashboard/Overview";
import TodaysOrders from "../features/Dashboard/TodaysOrders";
import TopCustomers from "../features/Dashboard/TopCustomers";
import TopProducts from "../features/Dashboard/TopProducts";
import Filter from "../ui/Filter";
import CitiesPieChart from "../features/Dashboard/RegionsPieChart";
import BarChartSales from "../features/Dashboard/BarChartSales";

const Dashboard = () => {
  return (
    <>
      <div className="flex items-center justify-between gap-3 mb-7">
        <div className="text-[30px] font-semibold ">Dashboard</div>
        <Filter
          filterField={"last"}
          options={[
            { label: "today", value: "1" },
            { label: "last 7 days", value: "7" },
            { label: "last 30 days", value: "30" },
            { label: "all", value: "90" },
          ]}
        />
      </div>
      <div className="min-h-screen flex">
        <div className="flex-1">
          <div className="grid grid-cols-4 grid-rows-[auto_auto_auto_auto] gap-5">
            <Overview />
            {/* chart */}
            <div className="col-span-4  bg-white my-10 px-5 py-5">
              <OrdersChart />
            </div>
            <BarChartSales />
            <CitiesPieChart />

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
