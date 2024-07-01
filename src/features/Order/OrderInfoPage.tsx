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
          <ProductSection order={order} title="Product Info" />
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

const OrderSection: React.FC<{
  title: string;
  settings?: any;
  order?: any;
}> = ({ title, order, settings }) => (
  <div className="p-4 bg-white shadow-md rounded-md fade-in">
    <h2 className="text-xl font-semibold text-sky-500 mb-2">{title}</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {title === "Order Info" && (
        <>
          <div className="border p-2 rounded-md">
            <span className="font-medium capitalize">Order ID:</span> {order.id}
          </div>
          <div className="border p-2 rounded-md">
            <span className="font-medium capitalize">Status:</span>{" "}
            {order.status}
          </div>
          <div className="border p-2 rounded-md">
            <span className="font-medium capitalize">Order Date:</span>{" "}
            {order.created_at}
          </div>
          <div className="border p-2 rounded-md">
            <span className="font-medium capitalize">Delivery Date:</span>{" "}
            {order.created_at}
          </div>
          <div className="border p-2 rounded-md">
            <span className="font-medium capitalize">Total:</span>{" "}
            {formatCurrency(order.totalPrice)}
          </div>
          <div className="border p-2 rounded-md">
            <span className="font-medium capitalize">Payment:</span>{" "}
            {order?.paymentStatus}
          </div>
        </>
      )}
      {title === "Customer Info" && (
        <>
          <div className="border p-2 rounded-md">
            <span className="font-medium capitalize">Name:</span>{" "}
            {order.customers.fullName}
          </div>
          <div className="border p-2 rounded-md">
            <span className="font-medium capitalize">Email:</span>{" "}
            {order.customers.email}
          </div>
          <div className="border p-2 rounded-md">
            <span className="font-medium capitalize">Phone:</span>{" "}
            {order.customers.phoneNumber}
          </div>
          <div className="border p-2 rounded-md">
            <span className="font-medium capitalize">Address:</span>{" "}
            {order.customers.address}
          </div>
          <div className="border p-2 rounded-md">
            <span className="font-medium capitalize">Country:</span>{" "}
            {order.customers.country}
          </div>
          <div className="border p-2 rounded-md">
            <span className="font-medium capitalize">City:</span>{" "}
            {order.customers.city}
          </div>
          <div className="border p-2 rounded-md">
            <span className="font-medium capitalize">Zip Code:</span>{" "}
            {order.customers.zipCode}
          </div>
          <div className="border p-2 rounded-md">
            <span className="font-medium capitalize">National ID:</span>{" "}
            {order.customers.nationalId}
          </div>
        </>
      )}
      {title === "Shipping Details" && (
        <>
          <div className="border p-2 rounded-md">
            <span className="font-medium capitalize">Method:</span> standard
            Shipping
          </div>
          <div className="border p-2 rounded-md">
            <span className="font-medium capitalize">Tracking Number:</span>{" "}
            3oi23oi2jljdlajd
          </div>
          <div className="border p-2 rounded-md">
            <span className="font-medium capitalize">Shipping Cost:</span>{" "}
            {formatCurrency(settings[0].shippingPrice)}
          </div>
        </>
      )}
      {title === "Payment Method" && (
        <>
          <div className="border p-2 rounded-md">
            <span className="font-medium capitalize">Method:</span>{" "}
            {order.paymentMethod}
          </div>
          {order.paymentMethod === "credit card" && (
            <div className="border p-2 rounded-md">
              <span className="font-medium capitalize">Card Number:</span> 93040
              93040 93040
            </div>
          )}
          {order.paymentMethod === "paypal" && (
            <div className="border p-2 rounded-md">
              <span className="font-medium capitalize">Email :</span>{" "}
              {order.customers.email}
            </div>
          )}
          {order.paymentMethod === "cod" && (
            <div className="border p-2 rounded-md">
              <span className="font-medium capitalize">Payment Status:</span>{" "}
              {order.paymentStatus}
            </div>
          )}
        </>
      )}
    </div>
  </div>
);

function ProductSection({ title, order }: { title: string; order: any }) {
  return (
    <div className="p-4 bg-white shadow-md rounded-md fade-in">
      <h2 className="text-xl font-semibold text-sky-500 mb-2">{title}</h2>
      <div className="space-y-2">
        <div className="border p-4 rounded-md">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <span className="block font-medium">{order?.products?.name}</span>
            <span>
              <span className="font-semibold">Quantity</span>: {order?.quantity}
            </span>
            <span>
              <span className="font-semibold">Price</span>:{" "}
              {formatCurrency(order?.products?.price)}
            </span>
            <span>
              {" "}
              <span className="font-semibold">Total</span>:{" "}
              {formatCurrency(order?.totalPrice)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderInfoPage;
