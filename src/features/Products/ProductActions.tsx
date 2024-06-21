import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import {
  HiEllipsisVertical,
  HiMiniPencilSquare,
  HiMiniSquare2Stack,
  HiMiniTrash,
} from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import { Product } from "../../Types/types";
import DeleteMsg from "../../ui/DeleteMsg";
import Modal from "../../ui/Modal";
import EditProductForm from "./EditProductForm";
import useDeleteProduct from "./useDeleteProduct";
import useDuplicateProduct from "./useDuplicateProduct";

type ActionsProps = {
  data: Product;
};


export default function ProductActions({ data }: ActionsProps) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const actionsRef = useRef<HTMLDivElement>(null);
  const { mutate, isLoading } = useDuplicateProduct();
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
  const {
    additional_images,
    brand,
    category,
    colors,
    created_at,
    description,
    discount,
    id,
    image,
    minOrder,
    name,
    price,
    quantity,
    sku,
    warehouse,
    weight,
  } = data;

  function handleDuplicate() {
    const duplicatedData: Product = {
      additional_images,
      brand,
      category,
      colors,
      created_at,
      description,
      discount,
      id: Math.floor(Math.random() * 1000),
      image,
      minOrder,
      name: `Copy of ${name}`,
      price,
      quantity,
      sku,
      warehouse,
      weight,
    };

    mutate(duplicatedData, {
      onSuccess: () => {
        toast.success("Product duplicated successfully");
        setOpen(false);
      },
    });
  }

  const { mutate: deleteProduct, isDeleting } = useDeleteProduct();

  return (
    <Modal>
      <div className="relative cursor-pointer" ref={actionsRef}>
        <HiEllipsisVertical onClick={() => setOpen(!open)} size={25} />
        {open && (
          <div className="bg-white shadow-sm flex flex-col  right-[50%] absolute border border-gray-50 z-40">
            <Modal.Open opens="edit">
              <button className="flex items-center hover:bg-gray-200 px-10 py-[10px] gap-2 font-light text-[14px]">
                <HiMiniPencilSquare size={20} />
                Edit
              </button>
            </Modal.Open>
            <Modal.Window name="edit">
              <EditProductForm onClose={() => setOpen(false)} data={data} />
            </Modal.Window>
            <span className="">
              <button
                onClick={handleDuplicate}
                className="flex items-center hover:bg-gray-200 px-10 py-[10px] gap-2 font-light text-[14px]"
              >
                <HiMiniSquare2Stack />
                Duplicate
              </button>
            </span>
            <Modal.Open opens="delete">
              <button className="flex items-center hover:bg-gray-200 px-10 py-[10px] gap-2 font-light text-[14px]">
                <HiMiniTrash size={20} />
                Delete
              </button>
            </Modal.Open>
            <Modal.Window name="delete">
              <DeleteMsg
                onClose={() => setOpen(false)}
                isDeleting={isDeleting}
                deleteFunction={deleteProduct}
                type="Product"
                data={data}
              />
            </Modal.Window>
          </div>
        )}
      </div>
    </Modal>
  );
}
