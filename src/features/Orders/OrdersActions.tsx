import { useEffect, useRef, useState } from "react";
import {
  HiEllipsisVertical,
  HiEye,
  HiMiniCheck,
  HiMiniPencilSquare,
  HiMiniTrash,
} from "react-icons/hi2";
import DeleteMsg from "../../ui/DeleteMsg";
import Modal from "../../ui/Modal";

import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import EditOrderForm from "./EditOrderForm";
import { useChangeOrderStatus } from "./useChangeOrderStatus";
import { useDeleteOrder } from "./useDeleteOrder";
import { useTranslation } from "react-i18next";

type ActionsProps = {
  data: any;
};

export default function Actions({ data }: ActionsProps) {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const { deletingOrder } = useDeleteOrder();

  const actionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        actionsRef.current &&
        !actionsRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape" || event.keyCode === 27) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [actionsRef, setOpen]);
  const navigate = useNavigate();
  const { changeStatus } = useChangeOrderStatus();
  return (
    <Modal>
      <div className="relative cursor-pointer" ref={actionsRef}>
        <HiEllipsisVertical onClick={() => setOpen(!open)} size={25} />
        {open && (
          <div className="bg-white shadow-sm flex flex-col  right-[50%] absolute border border-gray-50 dark:border-gray-700 dark:bg-gray-800 z-40">
            {data && data.status === "pending" && (
              <button
                onClick={() => {
                  changeStatus(
                    { id: data.id, status: "in-progress" },
                    {
                      onSuccess: () => {
                        toast.success("Order has been confirmed successfully");
                      },
                    }
                  );
                  setOpen(false);
                }}
                className="flex items-center hover:bg-gray-200  dark:hover:dark:bg-gray-600   px-10 py-[10px] gap-2 font-light text-[14px]"
              >
                <HiMiniCheck size={20} />
                {t("Confirm")}
              </button>
            )}
            <button
              onClick={() => {
                navigate(`/orders/${data.id}`);
              }}
              className="flex items-center hover:bg-gray-200  dark:hover:dark:bg-gray-600   px-10 py-[10px] gap-2 font-light text-[14px]"
            >
              <HiEye size={20} />
              {t("Details")}
            </button>

            <Modal.Open opens="editCustomer">
              <button className="flex items-center hover:bg-gray-200  dark:hover:dark:bg-gray-600   px-10 py-[10px] gap-2 font-light text-[14px]">
                <HiMiniPencilSquare size={20} />
                {t("Edit")}
              </button>
            </Modal.Open>

            <Modal.Window name="editCustomer">
              <EditOrderForm
                closeAction={() => setOpen(false)}
                onClose={() => {}}
                onSave={() => {}}
                data={data}
              />
            </Modal.Window>

            <Modal.Open opens="deleteCustomer">
              <button className="flex items-center hover:bg-gray-200  dark:hover:dark:bg-gray-600   px-10 py-[10px] gap-2 font-light text-[14px]">
                <HiMiniTrash size={20} /> {t("Delete")}
              </button>
            </Modal.Open>

            <Modal.Window name="deleteCustomer">
              <DeleteMsg
                data={data}
                type={t("Order")}
                onClose={() => {}}
                deleteFunction={deletingOrder}
                isDeleting={false}
              />
            </Modal.Window>
          </div>
        )}
      </div>
    </Modal>
  );
}
