import Table from "../../ui/Tabel";
import ProductActions from "./ProductActions";
import { formatCurrency } from "../../utils/helpers";
import { Product } from "../../Types/types";

type ProductRowProps = {
  data: Product;
};

export default function ProductRow({ data }: ProductRowProps) {
  const isOutOfStock = data.quantity === 0;
  console.log(data, isOutOfStock);

  return (
    <Table.Row>
      <div className="flex items-center ml-3">
        <img
          className={`   object-cover bg-no-repeat bg-center w-[60px] h-[60px] ${
            isOutOfStock ? "opacity-50" : ""
          }`}
          src={data && data.images && data.images[0]}
          alt=""
        />
      </div>
      <span className={`${isOutOfStock ? "line-through text-gray-400" : ""}`}>
        {data.sku}
      </span>
      <span
        className={`${
          isOutOfStock ? "line-through text-gray-400" : "text-[14px]"
        }`}
      >
        {data.name}
      </span>
      <span
        className={`${
          isOutOfStock ? "line-through text-gray-400" : "font-[500] text-[14px]"
        }`}
      >
        {formatCurrency(data.price)}
      </span>
      <span
        className={`${
          isOutOfStock
            ? "line-through text-gray-400"
            : "font-[500] opacity-90 text-green-500 text-[14px]"
        }`}
      >
        {data.discount === 0 ? "-" : `${formatCurrency(data.discount)}`}
      </span>
      <span
        className={`${
          isOutOfStock ? "line-through text-gray-400" : "font-[500] text-[14px]"
        }`}
      >
        {data.quantity}
      </span>
      <div
        className={`${
          isOutOfStock ? "line-through text-gray-400" : "text-[14px]"
        }`}
      >
        <span>{data.warehouse}</span>
      </div>
      <div className="flex justify-end">
        <ProductActions data={data} />
      </div>
    </Table.Row>
  );
}
