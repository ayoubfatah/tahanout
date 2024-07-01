import OrdersDetails from "../features/Orders/OrdersDetails";
import Filter from "../ui/Filter";

export default function Orders() {
  return (
    <div className="">
      <div className="flex justify-between mb-8 ">
        <h1 className="text-[24px] font-semibold">Orders</h1>
      </div>
      <OrdersDetails />
    </div>
  );
}
