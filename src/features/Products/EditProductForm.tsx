import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

type Order = {
  id: number;
  customerId: number;
  productId: number;
  status: string;
  shippingCost: number;
  totalPrice: number;
  productPrice: number;
  paymentMethod: string;
  quantity: number;
};

type EditOrderProps = {
  data: Order;
  onClose: () => void;
  onSave: (updatedOrder: Order) => void;
};

const EditOrder = ({ data: order, onClose, onSave }: EditOrderProps) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<Order>({
    defaultValues: { ...order },
  });

  useEffect(() => {
    if (order) {
      setValue("customerId", order.customerId);
      setValue("productId", order.productId);
      setValue("status", order.status);
      setValue("shippingCost", order.shippingCost);
      setValue("totalPrice", order.totalPrice);
      setValue("productPrice", order.productPrice);
      setValue("paymentMethod", order.paymentMethod);
      setValue("quantity", order.quantity);
    }
  }, [order, setValue]);

  const onSubmit = (data: Order) => {
    onSave(data);
    onClose();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="p-4 bg-white rounded shadow-md w-[600px] h-[600px] overflow-y-scroll"
    >
      <h2 className="text-xl font-bold mb-4">Edit Order</h2>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Customer ID:</label>
        <input
          className="w-full border border-gray-300 p-2 rounded"
          type="number"
          {...register("customerId", { required: "Customer ID is required" })}
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
          className="w-full border border-gray-300 p-2 rounded"
          type="number"
          {...register("productId", { required: "Product ID is required" })}
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
          <option value="pending">Pending</option>
          <option value="shipped">Shipped</option>
          <option value="delivered">Delivered</option>
          <option value="cancelled">Cancelled</option>
        </select>
        {errors.status && (
          <span className="text-red-500 text-sm">{errors.status.message}</span>
        )}
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Shipping Cost:</label>
        <input
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
        <label className="block text-sm font-medium mb-1">Total Price:</label>
        <input
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
        <label className="block text-sm font-medium mb-1">Product Price:</label>
        <input
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
        <label className="block text-sm font-medium mb-1">
          Payment Method:
        </label>
        <input
          className="w-full border border-gray-300 p-2 rounded"
          type="text"
          {...register("paymentMethod", {
            required: "Payment Method is required",
          })}
        />
        {errors.paymentMethod && (
          <span className="text-red-500 text-sm">
            {errors.paymentMethod.message}
          </span>
        )}
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Quantity:</label>
        <input
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
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Save
        </button>
        <button
          type="button"
          onClick={onClose}
          className="bg-gray-500 text-white px-4 py-2 rounded"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default EditOrder;
