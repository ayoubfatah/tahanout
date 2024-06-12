import useDeleteProduct from "../features/Products/useDeleteProduct";
import Button from "./Button";
import { Product } from "../Types/types";

type DeleteMsgProps = {
  data: Product;
  onClose: () => any;
};
export default function DeleteMsg({ onClose, data }: DeleteMsgProps) {
  const { mutate, isDeleting } = useDeleteProduct();
  return (
    <div className="flex flex-col gap-3 items-center py-5 px-7 ">
      <h1 className="text-[24px] font-semibold   ">Delete Product</h1>
      <p>Are you sure you want to delete this product?</p>
      <div className="flex gap-4 items-center">
        <Button
          onClick={() => {
            mutate(data.id, {
              onSuccess: () => {
                onClose();
              },
            });
          }}
          text="Delete"
          textColor="text-white"
          bgColor="bg-red-500"
          disabled={isDeleting}
        />
        <Button
          onClick={onClose}
          text="Cancel"
          textColor="text-black"
          bgColor="bg-white"
          border="border"
          borderColor="border-black"
          disabled={isDeleting}
        />
      </div>
    </div>
  );
}
