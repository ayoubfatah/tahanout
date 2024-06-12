import { useEffect, useRef, useState } from "react";
import {
  HiEllipsisVertical,
  HiMiniPencilSquare,
  HiMiniSquare2Stack,
  HiMiniTrash,
} from "react-icons/hi2";
import Modal from "./Modal";
import DeleteMsg from "./DeleteMsg";

import toast from "react-hot-toast";
import useDuplicateProduct from "../features/Products/useDuplicateProduct";
import { useNavigate } from "react-router-dom";
import EditProductForm from "../features/Products/EditProductForm";
import { Product } from "../Types/types";
type ProductType = {
  additional_images?: string;
  brand: string;
  category: string;
  colors: string;
  created_at: string;
  description: string;
  discount: number;
  id: number;
  image: string;
  minOrder: number;
  name: string;
  price: number;
  quantity: number;
  sku: string;
  warehouse: string;
  weight: number;
};

type ActionsProps = {
  data: ProductType;
};

export default function Actions({ data }: ActionsProps) {
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

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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
    console.log(duplicatedData);
    mutate(duplicatedData, {
      onSuccess: () => {
        toast.success("Product duplicated successfully");
        setOpen(false);
      },
    });
  }

  return (
    <Modal>
      <div className="relative cursor-pointer" ref={actionsRef}>
        <HiEllipsisVertical onClick={() => setOpen(!open)} size={25} />
        {open && (
          <div className="bg-white shadow-sm flex flex-col gap-4 right-[50%] absolute border border-gray-50 z-40">
            <Modal.Open opens="edit">
              <button className="flex items-center hover:bg-gray-200 px-10 py-[10px] gap-2 font-light text-[14px]">
                <HiMiniPencilSquare size={20} />
                Edit
              </button>
            </Modal.Open>
            <Modal.Window name="edit">
              <EditProductForm data={data} />
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
              <DeleteMsg data={data} />
            </Modal.Window>
          </div>
        )}
      </div>
    </Modal>
  );
}
