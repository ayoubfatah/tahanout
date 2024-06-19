import CustomerOptions from "../features/Customers/CustomerOptions";
import { useCustomers } from "../features/Customers/useCutomers";
import AddOrderForm from "../features/Orders/Options";
import OrdersTable from "../features/Orders/OrdersTable";
import Button from "../ui/Button";

export default function Orders() {
  const { isLoading, customers } = useCustomers();
  return (
    <>
      <OrdersTable />
      <Button
        text="Add Order"
        onClick={() => {}}
        textColor="text-white"
        bgColor="bg-sky-500"
      />
      <div>
        <AddOrderForm data={customers} isLoading={isLoading}>
          <CustomerOptions />
        </AddOrderForm>
      </div>
    </>
  );
}
