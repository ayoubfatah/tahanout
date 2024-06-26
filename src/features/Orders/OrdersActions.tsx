import { useEffect, useRef, useState } from "react";
import {
  HiEllipsisVertical,
  HiEye,
  HiMiniPencilSquare,
  HiMiniTrash,
  HiMiniTruck,
} from "react-icons/hi2";
import DeleteMsg from "../../ui/DeleteMsg";
import Modal from "../../ui/Modal";

import { CustomersType } from "../../Types/types";
import { useDeleteOrder } from "./useDeleteOrder";
import EditOrderForm from "./EditOrderForm";
import { useChangeOrderStatus } from "./useChangeOrderStatus";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

type ActionsProps = {
  data: any;
};

export default function Actions({ data }: ActionsProps) {
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
  const { changeStatus, isLoading } = useChangeOrderStatus();
  return (
    <Modal>
      <div className="relative cursor-pointer" ref={actionsRef}>
        <HiEllipsisVertical onClick={() => setOpen(!open)} size={25} />
        {open && (
          <div className="bg-white shadow-sm flex flex-col  right-[50%] absolute border border-gray-50 z-40">
            <button
              onClick={() => {
                navigate(`/orders/${data.id}`);
              }}
              className="flex items-center hover:bg-gray-200 px-10 py-[10px] gap-2 font-light text-[14px]"
            >
              <HiEye size={20} />
              Details
            </button>
            {data && data.status !== "delivered" && (
              <button
                onClick={() => {
                  changeStatus(
                    { id: data.id, status: "delivered" },
                    {
                      onSuccess: () => {
                        toast.success("Order has been delivered successfully");
                      },
                    }
                  );
                  setOpen(false);
                }}
                className="flex items-center hover:bg-gray-200 px-10 py-[10px] gap-2 font-light text-[14px]"
              >
                <HiMiniTruck size={20} />
                Delivered
              </button>
            )}
            <Modal.Open opens="editCustomer">
              <button className="flex items-center hover:bg-gray-200 px-10 py-[10px] gap-2 font-light text-[14px]">
                <HiMiniPencilSquare size={20} />
                Edit
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
              <button className="flex items-center hover:bg-gray-200 px-10 py-[10px] gap-2 font-light text-[14px]">
                <HiMiniTrash size={20} /> Delete
              </button>
            </Modal.Open>

            <Modal.Window name="deleteCustomer">
              <DeleteMsg
                data={data}
                type="Order"
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
