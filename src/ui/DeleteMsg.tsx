import useDeleteProduct from "../features/Products/useDeleteProduct";
import Button from "./Button";
import { CustomersType, Product } from "../Types/types";

type DeleteMsgProps = {
  data: Product | CustomersType;
  onClose: () => any;
  deleteFunction: any;
  type: string;
  isDeleting: any;
};
export default function DeleteMsg({
  onClose,
  data,
  type,
  isDeleting = false,
  deleteFunction = () => {},
}: DeleteMsgProps) {
  return (
    <div className="flex flex-col gap-3 items-center py-5 px-7 ">
      <h1 className="text-[24px] font-semibold   ">Delete Product</h1>
      <p>Are you sure you want to delete this {type}?</p>
      <div className="flex gap-4 items-center">
        <Button
          onClick={() => {
            deleteFunction(data.id, {
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
