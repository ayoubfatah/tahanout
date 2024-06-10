import { useEffect, useRef, useState } from "react";
import {
  HiEllipsisVertical,
  HiMiniPencilSquare,
  HiMiniSquare2Stack,
  HiMiniTrash,
} from "react-icons/hi2";

export default function Actions() {
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
    <div className="relative" ref={actionsRef}>
      <HiEllipsisVertical onClick={() => setOpen(!open)} size={25} />
      {open && (
        <div className="  bg-white shadow-sm flex flex-col gap-4 py-5 px-10 right-[50%] absolute border border-gray-50 z-40 ">
          <span className="flex items-center   gap-2 font-light text-[14px]">
            <HiMiniPencilSquare size={20} />
            Edit
          </span>
          <span className="flex items-center  gap-2 font-light text-[14px]">
            <span className="text-[20px]">
              <HiMiniSquare2Stack />
            </span>
            Duplicate
          </span>
          <span className="flex items-center  gap-2 font-light text-[14px]">
            <HiMiniTrash size={20} />
            delete
          </span>
        </div>
      )}
    </div>
  );
}
