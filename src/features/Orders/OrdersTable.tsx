import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import SearchInput from "../../ui/SearchInput";
import SortBy from "../../ui/SortBy";
import Table from "../../ui/Tabel";
import { ORDER_TABLE_PAGINATION } from "../../utils/consts";
import OrdersRow from "./OrdersRow";

export default function OrdersTable({ orders }: any) {
  const [searchParams] = useSearchParams();
  const sortByValue = searchParams.get("sortBy") || "createdAt-desc";
  const [field, direction] = sortByValue.split("-");
  const modifier = direction === "asc" ? 1 : -1;

  const sortedOrders = orders?.sort((a: any, b: any) => {
    if (field === "totalPrice" || field === "quantity") {
      return (a[field] - b[field]) * modifier;
    }
    if (field === "createdAt") {
      return (
        (new Date(a[field]).getTime() - new Date(b[field]).getTime()) * modifier
      );
    }
  });

  const [filteredOrders, setFilteredOrders] = useState(sortedOrders);
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = ORDER_TABLE_PAGINATION;

  // Get current orders
  const indexOfLastOrder = currentPage * ordersPerPage; // 5
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage; // 0
  const currentOrders = filteredOrders?.slice(
    indexOfFirstOrder,
    indexOfLastOrder
  );

  // Change page

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  useEffect(() => {
    setCurrentPage(1);
  }, [filteredOrders]);

  return (
    <>
      <div className="flex items-center justify-between">
        <SearchInput items={orders} onFilter={setFilteredOrders} order={true} />
        <SortBy
          options={[
            { value: "createdAt-desc", label: "Sort by date (Newest first)" },
            { value: "createdAt-asc", label: "Sort by date (Oldest first)" },
            {
              value: "totalPrice-asc",
              label: "Sort by total price (low first)",
            },
            {
              value: "totalPrice-desc",
              label: "Sort by total price (high first)",
            },
            { value: "quantity-asc", label: "Sort by quantity (low first)" },
            { value: "quantity-desc", label: "Sort by quantity (high first)" },
          ]}
        />
      </div>

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
          {currentOrders?.map((order: any) => (
            <OrdersRow key={order.id} order={order} />
          ))}
          <Table.Footer
            currentPage={currentPage}
            ordersPerPage={ordersPerPage}
            totalOrders={filteredOrders?.length || 0}
            paginate={paginate}
          />
        </Table>
      </div>
    </>
  );
}
