import { useEffect, useRef, useState } from "react";
import { HiEllipsisVertical } from "react-icons/hi2";
import { createContext, useContext } from "react";

type ActionsContextType = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  actionsRef: React.RefObject<HTMLDivElement>;
};

const ActionsContext = createContext<ActionsContextType | null>(null);

function Actions({ children }: { children: React.ReactNode }) {
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

  return (
    <ActionsContext.Provider value={{ open, setOpen, actionsRef }}>
      <div className="relative cursor-pointer" ref={actionsRef}>
        {children}
      </div>
    </ActionsContext.Provider>
  );
}

function Toggle() {
  const context = useContext(ActionsContext);
  if (!context) throw new Error("Toggle must be used within Actions");
  const { open, setOpen } = context;

  return <HiEllipsisVertical onClick={() => setOpen(!open)} size={25} />;
}

function Menu({ children }: { children: React.ReactNode }) {
  const context = useContext(ActionsContext);
  if (!context) throw new Error("Menu must be used within Actions");
  const { open } = context;

  if (!open) return null;

  return (
    <div className="bg-white shadow-sm flex flex-col right-[50%] absolute border border-gray-50 z-40">
      {children}
    </div>
  );
}

function Item({
  onClick,
  children,
}: {
  onClick?: () => void;
  children: React.ReactNode;
}) {
  const context = useContext(ActionsContext);
  if (!context) throw new Error("Item must be used within Actions");
  const { setOpen } = context;

  const handleClick = () => {
    if (onClick) onClick();
    setOpen(false);
  };

  return (
    <button
      onClick={handleClick}
      className="flex items-center hover:bg-gray-200 px-10 py-[10px] gap-2 font-light text-[14px]"
    >
      {children}
    </button>
  );
}

Actions.Toggle = Toggle;
Actions.Menu = Menu;
Actions.Item = Item;

export default Actions;
