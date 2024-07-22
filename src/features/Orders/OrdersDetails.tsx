import OrderForm from "../../features/Orders/OrderForm";
import OrdersTable from "../../features/Orders/OrdersTable";
import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import { useOrders } from "../../features/Orders/useOrders";
import Spinner from "../../ui/Spinner";

export default function OrdersDetails({ t }: any) {
  const { orders, isLoading } = useOrders();

  if (isLoading) return <Spinner />;

  return (
    <>
      <OrdersTable orders={orders} t={t} />
      <div className="mt-3">
        <Modal>
          <Modal.Open opens="addOrder">
            <Button
              text={t("Add Order")}
              onClick={() => {}}
              textColor="text-white"
              bgColor="bg-sky-500"
            />
          </Modal.Open>
          <Modal.Window name="addOrder">
            <OrderForm onClose={() => {}} />
          </Modal.Window>
        </Modal>
      </div>
    </>
  );
}
