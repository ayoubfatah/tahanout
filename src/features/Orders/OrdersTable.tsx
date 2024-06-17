import Table from "../../ui/Tabel";
import { formatCurrency } from "../../utils/helpers";
import ProductActions from "../Products/ProductActions";
export default function OrdersTable() {
  return (
    <Table col="1fr 1.7fr 1.3fr 0.8fr 1fr 1fr 1fr 0.5fr">
      <Table.Header>
        <span className="text-[16px] font-medium">Order id</span>
        <span className="text-[16px] font-medium">Customer</span>
        <span className="text-[16px] font-medium">Product</span>
        <span className="text-[16px] font-medium">SKU</span>
        <span className="text-[16px] font-medium">Date</span>
        <span className="text-[16px] font-medium">AMOUNT</span>
        <span className="text-[16px] font-medium">Status</span>
      </Table.Header>
      <Table.Row>
        <span className="text-[14px] text-gray-700 ">32401</span>
        <div className="flex flex-col">
          <span className="text-[14px] text-gray-700 ">Ayoub Fatah</span>
          <span className="text-[10px] text-gray-700 ">
            ayoubfatah222@gmail.com
          </span>
        </div>
        <span className="text-[14px] text-gray-700 ">MACBOOK AIR 1</span>
        <span className="text-[14px] text-gray-700 ">4DAJ2khf</span>
        <span className="text-[14px] text-gray-700 ">Jul 05 2025</span>
        <span className="text-[14px] text-gray-700 ">
          {formatCurrency(1000)}
        </span>
        <div>
          {" "}
          <span className="text-[12px]  uppercase   py-1 px-3 bg-red-200 text-red-600 rounded-full ">
            canceled
          </span>
        </div>
        <div className="flex justify-end">
          <ProductActions data={{}} />
        </div>
      </Table.Row>
      <Table.Row>
        <span className="text-[14px] text-gray-700 ">32401</span>
        <div
          className="flex 
    flex-col"
        >
          <span className="text-[14px] text-gray-700 ">John Deez</span>
          <span className="text-[10px] text-gray-700 ">0638398923</span>
        </div>
        <span className="text-[14px] text-gray-700 ">Iphone 14 Pro Max</span>
        <span className="text-[14px] text-gray-700 ">4DAJ232</span>

        <span className="text-[14px] text-gray-700 ">Dec 05 2024</span>
        <span className="text-[14px] text-gray-700 ">
          {formatCurrency(2500)}
        </span>
        <div>
          {" "}
          <span className="text-[12px]  uppercase   py-1 px-3 bg-green-200 text-green-600 rounded-full ">
            delivered
          </span>
        </div>
        <div className="flex justify-end">
          <ProductActions data={{}} />
        </div>
      </Table.Row>
      <Table.Footer></Table.Footer>
    </Table>
  );
}
