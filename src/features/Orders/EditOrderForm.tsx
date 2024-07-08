import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { CustomersType, OrderType } from "../../Types/types";
import useEditOrder from "./useEditOrder";
import { id } from "date-fns/locale";
import Button from "../../ui/Button";

type EditOrderProps = {
  data: OrderType;
  onClose: () => void;
  onSave: (updatedOrder: OrderType) => void;
  closeAction: any;
};

const EditOrder = ({
  data: order,
  onClose,
  onSave,
  closeAction,
}: EditOrderProps) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<OrderType>({
    defaultValues: { ...order },
  });

  useEffect(() => {
    if (order) {
      setValue("id", order.id);
      setValue("customerId", order.customerId);
      setValue("productId", order.productId);
      setValue("status", order.status);
      setValue("shippingCost", order.shippingCost);
      setValue("totalPrice", order.totalPrice);
      setValue("productPrice", order.productPrice);
      setValue("paymentMethod", order.paymentMethod);
      setValue("quantity", order.quantity);
      setValue("customerName", order.customers ? order.customers.fullName : "");
    }
  }, [order, setValue]);
  const { isEditing, mutate } = useEditOrder();
  const onSubmit = (data: OrderType) => {
    const orderData = {
      customerId: data.customerId,
      productId: data.productId,
      status: data.status,
      shippingCost: data.shippingCost,
      totalPrice: data.totalPrice,
      productPrice: data.productPrice,
      paymentMethod: data.paymentMethod,
      quantity: data.quantity,
    };

    mutate(
      { newProductData: { ...orderData }, id: data.id },
      {
        onSuccess: () => {
          onClose();
          closeAction();
        },
      }
    );
    onSave(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="p-4 w-[500px] h-[600px] overflow-y-scroll"
    >
      <h2 className="text-xl font-bold mb-4">Edit Order</h2>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1"> Order ID:</label>
        <input
          disabled
          className="cursor-not-allowed w-full border border-gray-300 p-2 rounded"
          type="text"
          {...register("id")}
        />
        {errors.customerId && (
          <span className="text-red-500 text-sm">
            {errors.customerId.message}
          </span>
        )}
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Customer Name:</label>
        <input
          disabled
          className="cursor-not-allowed w-full border border-gray-300 p-2 rounded"
          type="text"
          {...register("customerName")}
        />
        {errors.customerId && (
          <span className="text-red-500 text-sm">
            {errors.customerId.message}
          </span>
        )}
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Customer ID:</label>
        <input
          disabled
          className="cursor-not-allowed w-full border border-gray-300 p-2 rounded"
          type="number"
          {...register("customerId")}
        />
        {errors.customerId && (
          <span className="text-red-500 text-sm">
            {errors.customerId.message}
          </span>
        )}
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Product ID:</label>
        <input
          disabled
          className="cursor-not-allowed w-full border border-gray-300 p-2 rounded"
          type="number"
          {...register("productId")}
        />
        {errors.productId && (
          <span className="text-red-500 text-sm">
            {errors.productId.message}
          </span>
        )}
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Status:</label>
        <select
          className="w-full border border-gray-300 p-2 rounded"
          {...register("status", { required: "Status is required" })}
        >
          <option value="delivered">Delivered</option>
          <option value="in-progress">In Progress</option>
          <option value="pending">Pending</option>
          <option value="returned">Returned</option>
          <option value="canceled">canceled</option>
        </select>
        {errors.status && (
          <span className="text-red-500 text-sm">{errors.status.message}</span>
        )}
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Shipping Cost:</label>
        <input
          step={0.1}
          className="w-full border border-gray-300 p-2 rounded"
          type="number"
          {...register("shippingCost", {
            required: "Shipping Cost is required",
          })}
        />
        {errors.shippingCost && (
          <span className="text-red-500 text-sm">
            {errors.shippingCost.message}
          </span>
        )}
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Product Price:</label>
        <input
          disabled={isEditing}
          step={0.1}
          className="w-full border border-gray-300 p-2 rounded"
          type="number"
          {...register("productPrice", {
            required: "Product Price is required",
          })}
        />
        {errors.productPrice && (
          <span className="text-red-500 text-sm">
            {errors.productPrice.message}
          </span>
        )}
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Total Price:</label>
        <input
          disabled={isEditing}
          step={0.1}
          className="w-full border border-gray-300 p-2 rounded"
          type="number"
          {...register("totalPrice", { required: "Total Price is required" })}
        />
        {errors.totalPrice && (
          <span className="text-red-500 text-sm">
            {errors.totalPrice.message}
          </span>
        )}
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">
          Payment Method:
        </label>
        <select
          disabled={isEditing}
          className="w-full border border-gray-300 p-2 rounded"
          {...register("paymentMethod", {
            required: "Payment Method is required",
          })}
        >
          <option value="cash on delivery">Cash on Delivery</option>
          <option value="bank transfer">Bank Transfer</option>
          <option value="credit card">Credit Card</option>
          <option value="paypal">PayPal</option>
        </select>
        {errors.paymentMethod && (
          <span className="text-red-500 text-sm">
            {errors.paymentMethod.message}
          </span>
        )}
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Quantity:</label>
        <input
          disabled={isEditing}
          className="w-full border border-gray-300 p-2 rounded"
          type="number"
          {...register("quantity", { required: "Quantity is required" })}
        />
        {errors.quantity && (
          <span className="text-red-500 text-sm">
            {errors.quantity.message}
          </span>
        )}
      </div>

      <div className="flex gap-4">
        <button
          disabled={isEditing}
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Save
        </button>

        <Button
          disabled={isEditing}
          text="cancel"
          onClick={onClose}
          textColor="  text-gray-800"
          bgColor="bg-white"
          border="border"
          borderColor="border-gray-300"
        />
      </div>
    </form>
  );
};

export default EditOrder;
