import { useState } from "react";
import SearchInput from "../../ui/SearchInput";
import Table from "../../ui/Tabel";
import OrdersRow from "./OrdersRow";
export default function OrdersTable({ orders }: any) {
  const [filteredOrders, setFilteredOrders] = useState(orders);

  return (
    <>
      <SearchInput items={orders} onFilter={setFilteredOrders} order={true} />
      <div className="border border-gray-200 rounded-md text-gray-600">
        <Table col="1fr 1.7fr 1.3fr 0.8fr 1fr 1fr  1fr 1fr 0.5fr">
          <Table.Header>
            <span className="text-[16px] font-medium">Order id</span>
            <span className="text-[16px] font-medium">Customer</span>
            <span className="text-[16px] font-medium">Product</span>
            <span className="text-[16px] font-medium">SKU</span>
            <span className="text-[16px] font-medium">Date</span>
            <span className="text-[16px] font-medium">Quantity</span>
            <span className="text-[16px] font-medium">AMOUNT</span>
            <span className="text-[16px] font-medium">Status</span>
          </Table.Header>
          {filteredOrders?.map((order: any) => (
            <OrdersRow key={order.id} order={order} />
          ))}
          <Table.Footer></Table.Footer>
        </Table>
      </div>
    </>
  );
}
