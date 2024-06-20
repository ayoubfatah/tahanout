import OrderForm from "../../features/Orders/OrderForm";
import OrdersTable from "../../features/Orders/OrdersTable";
import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import { useOrders } from "../../features/Orders/useOrders";

export default function OrdersDetails() {
  const { orders, isLoading } = useOrders();

  return (
    <>
      <OrdersTable orders={orders} />
      <Modal>
        <Modal.Open opens="addOrder">
          <Button
            text="Add Order"
            onClick={() => {}}
            textColor="text-white"
            bgColor="bg-sky-500"
          />
        </Modal.Open>
        <Modal.Window name="addOrder">
          <OrderForm onClose={() => {}} />
        </Modal.Window>
      </Modal>
    </>
  );
}
