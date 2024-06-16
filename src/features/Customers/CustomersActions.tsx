import { useEffect, useRef, useState } from "react";
import {
  HiEllipsisVertical,
  HiEye,
  HiMiniPencilSquare,
  HiMiniSquare2Stack,
  HiMiniTrash,
} from "react-icons/hi2";
import Modal from "../../ui/Modal";
import DeleteMsg from "../../ui/DeleteMsg";

import toast from "react-hot-toast";
import useDuplicateProduct from "../Products/useDuplicateProduct";
import { useNavigate } from "react-router-dom";
import EditProductForm from "../Products/EditProductForm";
import { CustomersType, Product } from "../../Types/types";
import CustomerInfo from "./CustomerInfo";
import { useDeleteCustomer } from "./useDeleteCustomer";

type ActionsProps = {
  data: CustomersType;
};

export default function Actions({ data }: ActionsProps) {
  const [open, setOpen] = useState(false);

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

  const { isDeleting, deletingCustomer } = useDeleteCustomer();
  return (
    <Modal>
      <div className="relative cursor-pointer" ref={actionsRef}>
        <HiEllipsisVertical onClick={() => setOpen(!open)} size={25} />
        {open && (
          <div className="bg-white shadow-sm flex flex-col  right-[50%] absolute border border-gray-50 z-40">
            <Modal.Open opens="moreDetails">
              <button className="flex items-center hover:bg-gray-200 px-10 py-[10px]  gap-2  font-light text-[14px]">
                <HiEye size={20} /> details
              </button>
            </Modal.Open>

            <Modal.Open opens="deleteCustomer">
              <button className="flex items-center hover:bg-gray-200 px-10 py-[10px] gap-2 font-light text-[14px]">
                <HiMiniTrash size={20} /> Delete
              </button>
            </Modal.Open>
            <Modal.Window name="moreDetails">
              <CustomerInfo data={data} />
            </Modal.Window>
            <Modal.Window name="deleteCustomer">
              <DeleteMsg
                data={data}
                type="Customer"
                onClose={() => {}}
                isDeleting={isDeleting}
                deleteFunction={deletingCustomer}
              />
            </Modal.Window>
          </div>
        )}
      </div>
    </Modal>
  );
}
