import OrdersDetails from "../features/Orders/OrdersDetails";

export default function Orders() {
  return (
    <div className="">
      <div className="flex justify-between mb-8 ">
        <h1 className="text-[24px] font-semibold">Orders</h1>
        <h1 className="text-[24px] font-semibold">buttons</h1>
      </div>
      <OrdersDetails />
    </div>
  );
}
