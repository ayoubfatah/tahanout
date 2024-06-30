import React, {
  cloneElement,
  createContext,
  useContext,
  useState,
} from "react";
import { createPortal } from "react-dom";
import useCloseModal from "../hooks/useCloseModal";
import { HiXMark } from "react-icons/hi2";

const ModalContext = createContext({});

export default function Modal({ children }: any) {
  const [openName, setOpenName] = useState("");

  const close = () => setOpenName("");
  const openingWindow = (prop: any) => setOpenName(prop);

  return (
    <ModalContext.Provider value={{ openingWindow, openName, close }}>
      {children}
    </ModalContext.Provider>
  );
}
function Open({ children, opens }: any) {
  const { openingWindow }: any = useContext(ModalContext);
  return cloneElement(children, { onClick: () => openingWindow(opens) });
}

function Window({ children, name }: any) {
  const { openName, close }: any = useContext(ModalContext);

  const { overlyRef } = useCloseModal(close);
  if (openName !== name) return null;
  return (
    <div
      ref={overlyRef}
      className="   fixed top-0 left-0 w-full h-screen bg-black bg-opacity-0 backdrop-blur-sm z-50 transition-all duration-500"
    >
      <div className="  scrollbar-hide   fixed top-1/2 left-1/2  transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-lg p-2 transition-all duration-500">
        <button className="absolute top-4 right-6" onClick={close}>
          <HiXMark size={30} />
        </button>
        <div className="fade-in  ">
          {cloneElement(children, { onClose: close })}
        </div>
      </div>
    </div>
  );
}
Modal.Window = Window;
Modal.Open = Open;
