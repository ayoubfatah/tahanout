import { endOfDay, parseISO, startOfDay } from "date-fns";
import { HiOutlineEye } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import Spinner from "../../ui/Spinner";
import { formatCurrency, formatTime } from "../../utils/helpers";
import { useOrders } from "../Orders/useOrders";
import TodaysOrdersRow from "./TodaysOrdersRow";
import { OrderType } from "../../Types/types";

export default function TodaysOrders({ orders }: { orders: OrderType[] }) {
  function getTodaysOrders(orders: any) {
    const now = new Date();
    const todayStart = startOfDay(now);
    const todayEnd = endOfDay(now);

    return orders?.filter((order: any) => {
      const orderDate = order.createdAt ? parseISO(order.createdAt) : null;
      return orderDate && orderDate >= todayStart && orderDate <= todayEnd;
    });
  }

  const todayPendingOrders = getTodaysOrders(orders);

  return (
    <div className="bg-white  p-5 col-span-4 flex flex-col gap-3 overflow-x-scroll rounded-md duration-300 transition-all">
      <h2 className="text-xl font-semibold text-gray-700 flex items-center gap-1">
        {" "}
        Today's Orders{" "}
        <span className="text-sm text-gray-600">(pending orders)</span>
      </h2>
      {todayPendingOrders?.length ? (
        <div className="  px-1  bg-white    items-center gap-2 ">
          <div className="border-b border-gray-200  py-1.5 grid grid-cols-[1fr_1.7fr_1.3fr_0.8fr_1fr_1fr_1fr_1fr_1fr] text-gray-400 text-[12px]  ">
            <span className=" ">Order ID</span>
            <span className=" ">Customer</span>
            <span className=" ">Product</span>
            <span className=" ">SKU</span>
            <span className=" ">Order Date</span>
            <span className=" ">Quantity</span>
            <span className=" ">Total</span>
            <span className="ml-4">Status</span>

            <span></span>
          </div>
          {todayPendingOrders.map((order: any) => (
            <TodaysOrdersRow key={order.id} order={order} />
          ))}
        </div>
      ) : (
        <div>No orders today ...</div>
      )}
    </div>
  );
}
