// src/components/Dashboard.js
import { useSearchParams } from "react-router-dom";
import BarChartSales from "../features/Dashboard/BarChartSales";
import OrdersChart from "../features/Dashboard/OrdersChart";
import Overview from "../features/Dashboard/Overview";
import RegionsPieChart from "../features/Dashboard/RegionsPieChart";
import TodaysOrders from "../features/Dashboard/TodaysOrders";
import TopCustomers from "../features/Dashboard/TopCustomers";
import TopProducts from "../features/Dashboard/TopProducts";
import { useOrders } from "../features/Orders/useOrders";
import Filter from "../ui/Filter";
import Spinner from "../ui/Spinner";
import useObserver from "../hooks/useObserver";
import CategoriesPieChart from "../features/Dashboard/CategoriesPieChart";
import DatePicker from "react-datepicker";
import DateSelector from "../ui/DateSelector";

const Dashboard = () => {
  const { orders, isLoading } = useOrders();
  const [searchParams] = useSearchParams();
  const [ref, isVisible] = useObserver();

  const numDays = Number(searchParams.get("last")) || 1;
  if (isLoading) return <Spinner />;
  return (
    <>
      <div className="flex items-center justify-between gap-3 mb-7">
        <DateSelector />

        <Filter
          dates={true}
          filterField={"last"}
          options={[
            { label: "today", value: "1" },
            { label: "yesterday", value: "2" },
            { label: "this month", value: "30" },
            { label: "last month", value: "31" },
            { label: "this year", value: "365" },
            { label: "last year", value: "366" },
          ]}
        />
      </div>
      <div className="min-h-screen flex">
        <div className="flex-1">
          <div className="grid grid-cols-4 grid-rows-[auto_auto_auto_auto_auto  ] gap-5">
            <Overview orders={orders?.length ? orders : []} numDays={numDays} />
            {/* chart */}

            {numDays !== 1 && numDays !== 2 && (
              <div
                ref={ref}
                className={`col-span-4 bg-white px-5 py-5 ${
                  isVisible ? "fade-in" : ""
                }`}
              >
                <OrdersChart
                  orders={orders?.length ? orders : []}
                  numDays={numDays}
                />
              </div>
            )}

            <RegionsPieChart orders={orders?.length ? orders : []} />
            <CategoriesPieChart orders={orders?.length ? orders : []} />
            <BarChartSales orders={orders?.length ? orders : []} />

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
