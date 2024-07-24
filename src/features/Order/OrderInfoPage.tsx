import React from "react";
import { FaArrowLeft } from "react-icons/fa";
import { MdCancel, MdDelete, MdCheckCircle } from "react-icons/md";
import "../../styles/OrderInfoPage.css";
import toast from "react-hot-toast";
import useOrder from "./useOrder";
import Button from "../../ui/Button";
import Spinner from "../../ui/Spinner";
import useGetSettings from "../Settings/useGetSettings";
import { useNavigate, useParams } from "react-router-dom";
import { useChangeOrderStatus } from "../Orders/useChangeOrderStatus";
import { useDeleteOrder } from "../Orders/useDeleteOrder";
import Modal from "../../ui/Modal";
import DeleteMsg from "../../ui/DeleteMsg";
import OrderProductSection from "./OrderProductSection";
import { OrderSection } from "./OrderSection";
import { HiOutlineArrowUturnLeft } from "react-icons/hi2";
import { BiCheck } from "react-icons/bi";
import useUpdateProductQuantity from "../Products/useUpdateProductQuantity";
import { useUpdateOrderDate } from "./useUpdateOrderData";
import { useTranslation } from "react-i18next";

const OrderInfoPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const navigateBack = () => {
    navigate(-1);
  };
  const { order, isLoading } = useOrder();
  const { data: settings, isLoading: isLoadingSettings } = useGetSettings();
  const { changeStatus, isLoading: isLoadingStatus } = useChangeOrderStatus();
  const { mutate: updateDate } = useUpdateOrderDate();
  const { isDeleting, deletingOrder } = useDeleteOrder();
  const { id } = useParams();
  const { isEditing, upQuantity } = useUpdateProductQuantity();

  const setToCancel = () => {
    changeStatus({ id: id, status: "cancelled" });
    upQuantity({
      id: order.products.id,
      newQuantity: order.quantity + order.products.quantity,
    });
    updateDate({ id: id, status: "cancelled" });
    toast.success(t("Order Cancelled"), { id: "cancelOrder" });
  };

  const setToDelivered = () => {
    changeStatus({ id: id, status: "delivered" });
    toast.success(t("Order Delivered"), { id: "deliveredOrder" });
    updateDate({ id: id, status: "delivered" });
  };

  const setToReturned = () => {
    changeStatus({ id: id, status: "returned" });
    upQuantity({
      id: order.products.id,
      newQuantity: order.quantity + order.products.quantity,
    });

    toast.success(t("Order Returned"), { id: "returnOrder" });
  };

  const setToConfirmed = () => {
    changeStatus({ id: id, status: "in-progress" });
    toast.success(t("Order Confirmed"), { id: "confirmOrder" });
    updateDate({ id: id, status: "confirmed" });
  };

  const handleDelete = () => {
    deletingOrder(Number(id));
    upQuantity({
      id: order.products.id,
      newQuantity: order.quantity + order.products.quantity,
    });

    toast.success(t("Order Deleted"), { id: "deleteOrder" });
    navigate("/orders");
  };

  if (isLoading || isLoadingSettings) return <Spinner />;

  return (
    <Modal>
      <div className="fade-in-top container mx-auto p-6">
        <span>
          <span
            role="button"
            onClick={navigateBack}
            className="flex items-center mb-6"
          >
            <FaArrowLeft className="mr-2 text-sky-500 cursor-pointer text-xl" />
            <h1 className="text-2xl font-semibold text-sky-500">
              {t("Order Information")}
            </h1>
          </span>
        </span>
        <div className="space-y-6">
          <OrderSection
            settings={settings}
            order={order}
            title={t("Order Info")}
          />
          <OrderSection
            settings={settings}
            order={order}
            title={t("Customer Info")}
          />
          <OrderProductSection order={order} title={t("Product Info")} />
          <OrderSection
            order={order}
            settings={settings}
            title={t("Shipping Details")}
          />
          <OrderSection
            settings={settings}
            order={order}
            title={t("Payment Method")}
          />
        </div>
        <div className="flex justify-between mt-6">
          <Modal.Open opens="deleteOrder">
            <Button
              disabled={isLoading || isEditing}
              text={t("Delete order")}
              textColor="text-white"
              bgColor="bg-red-500"
              hoverColor="bg-red-700"
              onClick={() => {}}
              icon={<MdDelete size={20} className="mr-2 text-white" />}
              iconColor="text-white"
            />
          </Modal.Open>
          {order.status !== "delivered" && order.status !== "returned" && (
            <Button
              disabled={isLoading || order.status === "cancelled" || isEditing}
              text={t("Cancel order")}
              textColor="text-white"
              hoverColor="bg-red-700"
              bgColor="bg-red-500"
              onClick={setToCancel}
              icon={<MdCancel size={20} className="mr-2 text-white" />}
              iconColor="text-white"
            />
          )}

          {order.status !== "delivered" &&
            order.status !== "cancelled" &&
            order.status !== "pending" &&
            order.status !== "returned" && (
              <Button
                disabled={isLoading || isEditing}
                text={t("Mark as Returned")}
                textColor="text-white"
                hoverColor="bg-gray-600"
                bgColor="bg-gray-400"
                onClick={setToReturned}
                icon={
                  <HiOutlineArrowUturnLeft
                    size={20}
                    className="mr-2 text-white"
                  />
                }
                iconColor="text-white"
              />
            )}

          <Modal.Window name="deleteOrder">
            <DeleteMsg
              data={order}
              type="order"
              deleteFunction={handleDelete}
              isDeleting={isDeleting}
              onClose={() => {}}
            />
          </Modal.Window>
          {order.status !== "cancelled" &&
            order.status !== "pending" &&
            order.status !== "returned" && (
              <Button
                disabled={
                  isLoading || order.status === "delivered" || isEditing
                }
                text={t("Mark as Delivered")}
                textColor="text-white"
                bgColor="bg-green-500"
                hoverColor="bg-green-700"
                onClick={setToDelivered}
                icon={<MdCheckCircle size={20} className="mr-2 text-white" />}
                iconColor="text-white"
              />
            )}
          {order.status === "pending" && (
            <Button
              disabled={isLoading || isEditing}
              text={t("Confirm order")}
              textColor="text-white"
              bgColor="bg-blue-500"
              hoverColor="bg-blue-700"
              onClick={setToConfirmed}
              icon={<BiCheck size={20} className="mr-2 text-white" />}
              iconColor="text-white"
            />
          )}
        </div>
      </div>
    </Modal>
  );
};

export default OrderInfoPage;
