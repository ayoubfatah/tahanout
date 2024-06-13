import { useEffect, useRef } from "react";

export default function useCloseModal(closeModalFunction: any) {
  const overlyRef = useRef(null);

  useEffect(() => {
    if (!overlyRef.current) return;
    function handleClick(e: any) {
      if (e.target === overlyRef.current) closeModalFunction();
    }

    function handleEscape(e: any) {
      if (e.key === "Escape") closeModalFunction();
    }

    document.addEventListener("click", handleClick);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("click", handleClick);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [closeModalFunction, overlyRef]);

  return { overlyRef };
}
