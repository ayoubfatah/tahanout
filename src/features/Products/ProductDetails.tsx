import { Product } from "../../Types/types";
import ImageSwitcher from "../../ui/ImageSwitcher";
import EditProductForm from "./EditProductForm";

export default function ProductDetails() {
  return (
    <div className=" py-[80px]  space-x-4  px-[80px]  bg-white">
      <ImageSwitcher />
    </div>
  );
}
