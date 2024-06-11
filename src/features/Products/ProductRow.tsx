import Table from "../../ui/Tabel";
import Actions from "../../ui/Actions";
import { formatCurrency } from "../../utils/helpers";
import useAddProduct from "./useAddProduct";
import toast from "react-hot-toast";

export default function ProductRow({ data }: any) {
  return (
    <Table.Body>
      {" "}
      <div className="flex items-center ml-3">
        {" "}
        <img
          className="object-cover bg-no-repeat bg-center w-[60px] h-[60px]"
          src={data.image}
          alt=""
        />
      </div>
      <span className="">{data.sku}</span>
      <span className="text-[14px]">{data.name}</span>
      <span className="font-[500] text-[14px]">
        {formatCurrency(data.price)}{" "}
      </span>
      <span className="font-[500] text-[14px] ">
        {formatCurrency(data.discount)}{" "}
      </span>
      <span className="font-[500] text-[14px]">{data.quantity}</span>
      <div className="text-[14px]">
        <span className="  ">{data.warehouse}</span>
      </div>
      <div className="flex justify-end ">
        <button>
          <Actions data={data} />
        </button>
      </div>
    </Table.Body>
  );
}
