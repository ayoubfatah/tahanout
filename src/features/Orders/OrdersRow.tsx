import StatusBadge from "../../ui/StatusBadge";
import Table from "../../ui/Tabel";
import { formatCurrency, formatDate } from "../../utils/helpers";
import OrderActions from "./OrdersActions";
export default function OrdersRow({ order }: any) {
  return (
    <Table.Row>
      <span className="text-[14px] text-gray-700 ">{order.id} </span>
      <div className="flex flex-col">
        <span className="text-[14px] text-gray-700 ">
          {order?.customers?.fullName}
        </span>
        <span className="text-[10px] text-gray-700 ">
          {order?.customers?.email}
        </span>
      </div>
      <span className="text-[14px] text-gray-700 ">
        {order?.products?.name}
      </span>
      <span className="text-[14px] text-gray-700 ">{order?.products?.sku}</span>
      <span className="text-[14px] text-gray-700 ">
        {" "}
        {formatDate(order?.createdAt)}
      </span>
      <span className="text-[14px] text-gray-700 ">{order.quantity}</span>
      <span className="text-[14px] text-gray-700 ">
        {formatCurrency(order?.totalPrice)}
      </span>
      <div>
        {" "}
        <StatusBadge status={order?.status} />
      </div>
      <div className="flex justify-end">
        <OrderActions data={order} />
      </div>
    </Table.Row>
  );
}
