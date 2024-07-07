import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import {
  HiEllipsisVertical,
  HiEye,
  HiMiniPencilSquare,
  HiMiniSquare2Stack,
  HiMiniTrash,
  HiOutlinePlus,
} from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import { Product } from "../../Types/types";
import DeleteMsg from "../../ui/DeleteMsg";
import Modal from "../../ui/Modal";
import EditProductForm from "./EditProductForm";
import useDeleteProduct from "./useDeleteProduct";
import useDuplicateProduct from "./useDuplicateProduct";
import OrderForm from "../Orders/OrderForm";
import { useTahanout } from "../../contextApi/useTahanoutCA";

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
    brand,
    category,
    colors,
    createdAt,
    description,
    discount,
    id,
    images,
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
      brand,
      category,
      colors,
      createdAt,
      description,
      discount,
      id: Math.floor(Math.random() * 1000),
      images,
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
  const dataFromProduct = { ...data };

  function handleDetails() {
    navigate(`/products/${id}`);
  }
  return (
    <Modal>
      <div className="relative cursor-pointer" ref={actionsRef}>
        <HiEllipsisVertical onClick={() => setOpen(!open)} size={25} />
        {open && (
          <div className="bg-white shadow-sm flex flex-col  right-[50%] absolute border border-gray-50 z-40">
            {/* make order */}
            <button
              onClick={handleDetails}
              className=" flex items-center hover:bg-gray-200 px-10 py-[10px] gap-2 font-light text-[14px]"
            >
              <HiEye size={20} />
              Details
            </button>
            {data.quantity > 0 ? (
              <Modal.Open opens="make_order">
                <button className=" flex items-center hover:bg-gray-200 px-10 py-[10px] gap-2 font-light text-[14px]">
                  <HiOutlinePlus size={20} />
                  Order
                </button>
              </Modal.Open>
            ) : null}
            <Modal.Window name="make_order">
              <OrderForm
                type="productTable"
                dataFromProductActions={dataFromProduct}
                onClose={() => setOpen(false)}
              />
            </Modal.Window>
            {/* edit */}
            <Modal.Open opens="edit">
              <button className="flex items-center hover:bg-gray-200 px-10 py-[10px] gap-2 font-light text-[14px]">
                <HiMiniPencilSquare size={20} />
                Edit
              </button>
            </Modal.Open>
            <Modal.Window name="edit">
              <EditProductForm onClose={() => setOpen(false)} data={data} />
            </Modal.Window>
            {/* delete */}
            <button
              onClick={handleDuplicate}
              className="flex items-center hover:bg-gray-200 px-10 py-[10px] gap-2 font-light text-[14px]"
            >
              <HiMiniSquare2Stack />
              Duplicate
            </button>
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
