import { endOfDay, parseISO, startOfDay } from "date-fns";
import { HiOutlineEye } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import Spinner from "../../ui/Spinner";
import { formatCurrency, formatTime } from "../../utils/helpers";
import { useOrders } from "../Orders/useOrders";

export default function TodaysOrders() {
  const { isLoading, orders } = useOrders();

  function getTodaysOrders(orders: any) {
    const now = new Date();
    const todayStart = startOfDay(now);
    const todayEnd = endOfDay(now);

    return orders?.filter((order: any) => {
      const orderDate = order.createdAt ? parseISO(order.createdAt) : null;
      return orderDate && orderDate >= todayStart && orderDate <= todayEnd;
    });
  }

  const todayPendingOrders = getTodaysOrders(orders)?.filter(
    (order: any) => order.status === "pending"
  );

  const navigate = useNavigate();

  if (isLoading) return <Spinner />;
  if (todayPendingOrders?.length === 0)
    return (
      <div className="px-3   bg-white    items-center gap-2">
        No orders found
      </div>
    );
  return (
    <div className="bg-white  p-5 col-span-4 flex flex-col gap-3 overflow-x-scroll rounded-md duration-300 transition-all">
      <h2 className="text-xl font-semibold text-gray-700 flex items-center gap-1">
        {" "}
        Today's Orders{" "}
        <span className="text-sm text-gray-600">(pending orders)</span>
      </h2>
      <div className=" px-3 px-2  bg-white    items-center gap-2 ">
        <div className="border-b border-gray-200  py-1.5 grid grid-cols-[1fr_1.7fr_1.3fr_0.8fr_1fr_1fr_1fr_1fr] text-gray-400 text-[12px]  ">
          <span className=" ">Order ID</span>
          <span className=" ">Customer</span>
          <span className=" ">Product</span>
          <span className=" ">SKU</span>
          <span className=" ">Order Date</span>
          <span className=" ">Quantity</span>
          <span className=" ">Total</span>

          <span></span>
        </div>
        {todayPendingOrders.map((order: any) => (
          <div
            key={order.id}
            className=" border-b px-2 hover:bg-gray-100 border-gray-200  py-1.5  grid-cols-[1fr_1.7fr_1.3fr_0.8fr_1fr_1fr_1fr_1fr] grid items-center"
          >
            <span className="text-[14px] text-gray-700">{order.id}</span>
            <div className="flex flex-col">
              <span className="text-[14px] text-gray-700">
                {order.customers?.fullName}
              </span>
              <span className="text-[10px] text-gray-700">
                {order.customers?.email}
              </span>
            </div>
            <span className="text-[14px] text-gray-700">
              {order.products?.name}
            </span>
            <span className="text-[14px] text-gray-700">
              {order.products?.sku}
            </span>
            <span className="text-[14px] text-gray-700">
              {order.createdAt ? formatTime(order.createdAt) : "N/A"}
            </span>
            <span className="text-[14px] text-gray-700">{order.quantity}</span>
            <span className="text-[14px] text-gray-700">
              {formatCurrency(order.totalPrice)}
            </span>

            <div className="flex justify-end">
              <span
                onClick={() => navigate(`/orders/${order.id}`)}
                className="cursor-pointer  "
              >
                <HiOutlineEye />
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
