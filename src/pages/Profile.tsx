import React from "react";
import { FaArrowLeft } from "react-icons/fa";
import { MdCancel, MdDelete, MdCheckCircle } from "react-icons/md";
import "../styles/OrderInfoPage.css";
import Button from "../ui/Button";
import toast from "react-hot-toast";

const OrderInfoPage: React.FC = () => {
  const fakeData = {
    orderInfo: {
      orderId: "12345",
      status: "Processing",
      Orderdate: "2024-06-30",
      deliveryDate: "2024-07-01",
      total: "$150.00",
      payment: "Paid",
    },
    customerInfo: {
      name: "John Doe",
      email: "john.doe@example.com",
      phone: "123-456-7890",
      address: "123 Main St, Springfield, USA",
      country: "United States",
      city: "Springfield",
      zipCode: "12345",
      nationalId: "123456789",
    },
    productInfo: [
      {
        name: "Product 1",
        quantity: 2,
        price: "$50.00",
        totalPrice: "$100.00",
      },
    ],
    shippingDetails: {
      method: "Standard Shipping",
      trackingNumber: "TRACK123456",
      shippingCost: "$10.00",
    },
    paymentMethod: {
      method: "Credit Card",
      cardNumber: "**** **** **** 1234",
    },
  };

  return (
    <div className="fade-in-top container mx-auto p-6">
      <div className="flex items-center mb-6">
        <FaArrowLeft className="mr-2 text-sky-500 cursor-pointer text-xl" />
        <h1 className="text-2xl font-semibold text-sky-500">
          Order Information
        </h1>
      </div>
      <div className="space-y-6">
        <OrderSection title="Order Info" data={fakeData.orderInfo} />
        <OrderSection title="Customer Info" data={fakeData.customerInfo} />
        <ProductSection title="Product Info" products={fakeData.productInfo} />
        <OrderSection
          title="Shipping Details"
          data={fakeData.shippingDetails}
        />
        <OrderSection title="Payment Method" data={fakeData.paymentMethod} />
      </div>
      <div className="flex justify-between mt-6">
        <Button
          text="Cancel order"
          textColor="text-white"
          hoverColor="bg-red-700"
          bgColor="bg-red-500"
          onClick={() => toast.success("Order cancelled successfully")}
          icon={<MdCancel size={20} className="mr-2 text-white" />}
          iconColor="text-white"
        />
        <Button
          text="Delete order"
          textColor="text-white"
          bgColor="bg-red-500"
          hoverColor="bg-red-700"
          onClick={() => toast.success("Order deleted successfully")}
          icon={<MdDelete size={20} className="mr-2 text-white" />}
          iconColor="text-white"
        />
        <Button
          text="Mark as Delivered"
          textColor="text-white"
          bgColor="bg-green-500"
          onClick={() =>
            toast.success("Order marked as delivered successfully")
          }
          hoverColor="bg-green-700"
          icon={<MdCheckCircle size={20} className="mr-2 text-white" />}
          iconColor="text-white"
        />
      </div>
    </div>
  );
};

const OrderSection: React.FC<{
  title: string;
  data: Record<string, string>;
}> = ({ title, data }) => (
  <div className="p-4 bg-white shadow-md rounded-md fade-in">
    <h2 className="text-xl font-semibold text-sky-500 mb-2">{title}</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {Object.entries(data).map(([key, value]) => (
        <div key={key} className="border p-2 rounded-md">
          <span className="font-medium capitalize">
            {key.replace(/([A-Z])/g, " $1").trim()}:
          </span>{" "}
          {value}
        </div>
      ))}
    </div>
  </div>
);

const ProductSection: React.FC<{
  title: string;
  products: Array<{
    name: string;
    quantity: number;
    price: string;
    totalPrice: string;
  }>;
}> = ({ title, products }) => (
  <div className="p-4 bg-white shadow-md rounded-md fade-in">
    <h2 className="text-xl font-semibold text-sky-500 mb-2">{title}</h2>
    <div className="space-y-2">
      {products.map((product, index) => (
        <div key={index} className="border p-4 rounded-md">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <span className="block font-medium">{product.name}</span>
            <span>Quantity: {product.quantity}</span>
            <span>Price: {product.price}</span>
            <span>Total: {product.totalPrice}</span>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default OrderInfoPage;
