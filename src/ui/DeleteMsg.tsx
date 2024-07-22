import useDeleteProduct from "../features/Products/useDeleteProduct";
import Button from "./Button";
import { CustomersType, Product } from "../Types/types";
import { useTranslation } from "react-i18next";

type DeleteMsgProps = {
  data: any;
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
  const { t } = useTranslation();
  return (
    <div className="flex flex-col gap-3 items-center py-5 px-7 ">
      <h1 className="text-[24px] font-semibold   ">Delete {type}</h1>
      <p>
        {t("Are you sure you want to delete this")} {type}?
      </p>
      <div className="flex gap-4 items-center">
        <Button
          onClick={() => {
            deleteFunction(data.id, {
              onSuccess: () => {
                onClose();
              },
            });
          }}
          text={t("Delete")}
          textColor="text-white"
          bgColor="bg-red-500"
          disabled={isDeleting}
        />

        <Button
          onClick={onClose}
          text={t("Cancel")}
          textColor="  text-gray-800"
          bgColor="bg-white"
          border="border"
          borderColor="border-black"
          disabled={isDeleting}
        />
      </div>
    </div>
  );
}
