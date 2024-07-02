import { formatCurrency } from "../../utils/helpers";

export const OrderSection: React.FC<{
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
            {order.createdAt}
          </div>
          <div className="border p-2 rounded-md">
            <span className="font-medium capitalize">Delivery Date:</span>{" "}
            {order.createdAt}
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
