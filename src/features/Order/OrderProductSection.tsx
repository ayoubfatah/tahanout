import { formatCurrency } from "../../utils/helpers";

export default function OrderProductSection({
  title,
  order,
}: {
  title: string;
  order: any;
}) {
  return (
    <div className="p-4 bg-white shadow-md rounded-md fade-in">
      <h2 className="text-xl font-semibold text-sky-500 mb-2">{title}</h2>
      <div className="space-y-2">
        <div className="border p-4 rounded-md">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <span className="block font-medium">{order?.products?.name}</span>
            <span>
              <span className="font-semibold">Quantity</span>: {order?.quantity}
            </span>

            <span>
              <span className="font-semibold">Price</span>:{" "}
              {formatCurrency(order?.products?.price)}
            </span>

            <span>
              <span className="font-semibold">Discount</span>:{" "}
              {formatCurrency(order?.products?.discount * order?.quantity)}
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
