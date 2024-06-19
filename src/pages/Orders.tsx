import CustomerOptions from "../features/Orders/CustomerOptions";
import ProductOptions from "../features/Orders/ProductOptions";
import { useCustomers } from "../features/Customers/useCutomers";

import OrdersTable from "../features/Orders/OrdersTable";
import useProducts from "../features/Products/useProducts";
import Button from "../ui/Button";
import Dropdown from "../ui/Dropdown";
import PaymentMethodDropDown from "../ui/PaymentMethodDropDown";
import Modal from "../ui/Modal";
import OrderForm from "../features/Orders/OrderForm";

export default function Orders() {
  return (
    <>
      <OrdersTable />
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
