// src/components/Dashboard.js
import { useSearchParams } from "react-router-dom";
import BarChartSales from "../features/Dashboard/BarChartSales";
import OrdersChart from "../features/Dashboard/OrdersChart";
import Overview from "../features/Dashboard/Overview";
import CitiesPieChart from "../features/Dashboard/RegionsPieChart";
import TodaysOrders from "../features/Dashboard/TodaysOrders";
import TopCustomers from "../features/Dashboard/TopCustomers";
import TopProducts from "../features/Dashboard/TopProducts";
import { useOrders } from "../features/Orders/useOrders";
import Filter from "../ui/Filter";
import Spinner from "../ui/Spinner";

const Dashboard = () => {
  const { orders, isLoading } = useOrders();
  const [searchParams] = useSearchParams();
  const numDays = Number(searchParams.get("last")) || 15;
  if (isLoading) return <Spinner />;
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
            { label: "last 90 days", value: "90" },
          ]}
        />
      </div>
      <div className="min-h-screen flex">
        <div className="flex-1">
          <div className="grid grid-cols-4 grid-rows-[auto_auto_auto_auto] gap-5">
            <Overview orders={orders?.length ? orders : []} numDays={numDays} />
            {/* chart */}
            <BarChartSales />
            <CitiesPieChart />

            <div className="col-span-4  bg-white  px-5 py-5">
              <OrdersChart
                orders={orders?.length ? orders : []}
                numDays={numDays}
              />
            </div>

            {/* today orders */}
            <TodaysOrders orders={orders?.length ? orders : []} />
            <TopCustomers orders={orders?.length ? orders : []} />
            <TopProducts orders={orders?.length ? orders : []} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
