import React from "react";
import { FaArrowLeft } from "react-icons/fa";
import { MdCancel, MdDelete, MdCheckCircle } from "react-icons/md";
import "../../styles/OrderInfoPage.css";
import toast from "react-hot-toast";
import useOrder from "./useOrder";
import Button from "../../ui/Button";
import { formatCurrency } from "../../utils/helpers";
import Spinner from "../../ui/Spinner";
import useGetSettings from "../Settings/useGetSettings";
import { useNavigate, useParams } from "react-router-dom";
import { useChangeOrderStatus } from "../Orders/useChangeOrderStatus";
import { useDeleteOrder } from "../Orders/useDeleteOrder";
import Modal from "../../ui/Modal";
import DeleteMsg from "../../ui/DeleteMsg";
import OrderProductSection from "./OrderProductSection";
import { OrderSection } from "./OrderSection";

const OrderInfoPage: React.FC = () => {
  const navigate = useNavigate();
  const navigateBack = () => {
    navigate(-1);
  };
  const { order, isLoading } = useOrder();
  const { data: settings, isLoading: isLoadingSettings } = useGetSettings();
  const { changeStatus, isLoading: isLoadingStatus } = useChangeOrderStatus();
  const { isDeleting, deletingOrder } = useDeleteOrder();
  const { id } = useParams();
  const setToCancel = () => {
    changeStatus({ id: id, status: "canceled" });
    toast.success("Order Cancelled", { id: "cancelOrder" });
  };
  const setToDelivered = () => {
    changeStatus({ id: id, status: "delivered" });
    toast.success("Order Delivered", { id: "deliveredOrder" });
  };
  const handleDelete = () => {
    deletingOrder(Number(id));
    toast.success("Order Deleted", { id: "deleteOrder" });
    navigate("/orders");
  };
  if (isLoading || isLoadingSettings) return <Spinner />;
  return (
    <Modal>
      <div className="fade-in-top container mx-auto p-6">
        <div
          role="button"
          onClick={navigateBack}
          className="flex items-center mb-6"
        >
          <FaArrowLeft className="mr-2 text-sky-500 cursor-pointer text-xl" />
          <h1 className="text-2xl font-semibold text-sky-500">
            Order Information
          </h1>
        </div>
        <div className="space-y-6">
          <OrderSection settings={settings} order={order} title="Order Info" />
          <OrderSection
            settings={settings}
            order={order}
            title="Customer Info"
          />
          <OrderProductSection order={order} title="Product Info" />
          <OrderSection
            order={order}
            settings={settings}
            title="Shipping Details"
          />
          <OrderSection
            settings={settings}
            order={order}
            title="Payment Method"
          />
        </div>
        <div className="flex justify-between mt-6">
          {order.status !== "delivered" && (
            <Button
              disabled={isLoading || order.status === "canceled"}
              text="Cancel order"
              textColor="text-white"
              hoverColor="bg-red-700"
              bgColor="bg-red-500"
              onClick={setToCancel}
              icon={<MdCancel size={20} className="mr-2 text-white" />}
              iconColor="text-white"
            />
          )}

          <Modal.Open opens="deleteOrder">
            <Button
              disabled={isLoading}
              text="Delete order"
              textColor="text-white"
              bgColor="bg-red-500"
              hoverColor="bg-red-700"
              onClick={() => {}}
              icon={<MdDelete size={20} className="mr-2 text-white" />}
              iconColor="text-white"
            />
          </Modal.Open>

          <Modal.Window name="deleteOrder">
            <DeleteMsg
              data={order}
              type="order"
              deleteFunction={handleDelete}
              isDeleting={isDeleting}
              onClose={() => {}}
            />
          </Modal.Window>
          {order.status !== "canceled" && (
            <Button
              disabled={isLoading || order.status === "delivered"}
              text="Mark as Delivered"
              textColor="text-white"
              bgColor="bg-green-500"
              hoverColor="bg-green-700"
              onClick={setToDelivered}
              icon={<MdCheckCircle size={20} className="mr-2 text-white" />}
              iconColor="text-white"
            />
          )}
        </div>
      </div>
    </Modal>
  );
};

export default OrderInfoPage;
