import { useSearchParams } from "react-router-dom";
import BarChartSales from "../features/Dashboard/BarChartSales";
import CategoriesPieChart from "../features/Dashboard/CategoriesPieChart";
import OrdersChart from "../features/Dashboard/OrdersChart";
import Overview from "../features/Dashboard/Overview";
import RegionsPieChart from "../features/Dashboard/RegionsPieChart";
import TodaysOrders from "../features/Dashboard/TodaysOrders";
import TopCustomers from "../features/Dashboard/TopCustomers";
import TopProducts from "../features/Dashboard/TopProducts";
import { useOrders } from "../features/Orders/useOrders";
import useObserver from "../hooks/useObserver";
import DateSelector from "../ui/DateSelector";
import Filter from "../ui/Filter";
import Spinner from "../ui/Spinner";
import { eachDayOfInterval } from "date-fns";
import { useTranslation } from "react-i18next";

const Dashboard = () => {
  const { orders, isLoading } = useOrders();
  const [searchParams] = useSearchParams();
  const [ref, isVisible] = useObserver();
  const { t, i18n } = useTranslation();

  const start = searchParams.get("start");
  const end = searchParams.get("end");

  let datesFromDatePicker;
  if (start && end) {
    datesFromDatePicker = eachDayOfInterval({
      start: new Date(start),
      end: new Date(end),
    });
  }
  const numDays = Number(searchParams.get("last"));

  if (isLoading) return <Spinner />;

  console.log(i18n.language);
  return (
    <>
      <div
        className={`flex ${
          i18n.language === "fr" ? " flex-col-reverse" : "flex-row"
        } items-center justify-between gap-3 mb-7`}
      >
        <DateSelector />

        <Filter
          home={true}
          dates={true}
          filterField={"last"}
          options={[
            { label: t("today"), value: "1" },
            { label: t("yesterday"), value: "2" },
            { label: t("this month"), value: "30" },
            { label: t("last month"), value: "31" },
            { label: t("this year"), value: "365" },
            { label: t("last year"), value: "366" },
          ]}
        />
      </div>
      <div className="min-h-screen flex">
        <div className="flex-1">
          <div className="grid grid-cols-4 grid-rows-[auto_auto_auto_auto_auto  ] gap-5">
            <Overview
              datesFromDatePicker={datesFromDatePicker}
              orders={orders?.length ? orders : []}
              numDays={numDays}
            />
            <TodaysOrders orders={orders?.length ? orders : []} />

            <RegionsPieChart
              datesFromDatePicker={datesFromDatePicker}
              numDays={numDays}
              orders={orders?.length ? orders : []}
            />
            <CategoriesPieChart
              datesFromDatePicker={datesFromDatePicker}
              numDays={numDays}
              orders={orders?.length ? orders : []}
            />
            {/* chart */}

            {
              <div
                ref={ref}
                className={`col-span-4 bg-white dark:bg-gray-800 px-5 py-5 ${
                  isVisible ? "fade-in" : ""
                }`}
              >
                <OrdersChart
                  datesFromDatePicker={datesFromDatePicker}
                  orders={orders?.length ? orders : []}
                  numDays={numDays}
                />
              </div>
            }

            <BarChartSales orders={orders?.length ? orders : []} />

            {/* today orders */}
            <TopCustomers orders={orders?.length ? orders : []} />
            <TopProducts orders={orders?.length ? orders : []} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
