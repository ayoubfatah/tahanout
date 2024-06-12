import { Product } from "../../Types/types";
import EditProductForm from "./EditProductForm";

export default function ProductDetails({ product }: any) {
  return (
    <div className=" py-[80px]  space-x-4  px-[80px]  bg-white">
      <EditProductForm product={product} />
    </div>
  );
}
