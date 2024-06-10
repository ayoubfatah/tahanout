import { useEffect, useRef, useState } from "react";
import {
  HiEllipsisVertical,
  HiMiniPencilSquare,
  HiMiniSquare2Stack,
  HiMiniTrash,
} from "react-icons/hi2";
import Modal from "./Modal";
import DeleteMsg from "./DeleteMsg";

export default function Actions({ data }: any) {
  const [open, setOpen] = useState(false);
  const actionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: any) {
      if (actionsRef.current && !actionsRef.current.contains(event.target)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <Modal>
      <div className="relative" ref={actionsRef}>
        <HiEllipsisVertical onClick={() => setOpen(!open)} size={25} />
        {open && (
          <div className="  bg-white shadow-sm flex flex-col gap-4   right-[50%] absolute border border-gray-50 z-40 ">
            <button
              onClick={() => console.log(data)}
              className="flex items-center hover:bg-gray-200 px-10 py-[10px]  gap-2 font-light text-[14px]"
            >
              <HiMiniPencilSquare size={20} />
              Edit
            </button>
            <span className="flex items-center hover:bg-gray-200 px-10 py-[10px]  gap-2 font-light text-[14px]">
              <button className="text-[20px]">
                <HiMiniSquare2Stack />
              </button>
              Duplicate
            </span>
            <Modal.Open opens="delete">
              <button className="flex items-center hover:bg-gray-200 px-10 py-[10px]  gap-2 font-light text-[14px]">
                <HiMiniTrash size={20} />
                delete
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
