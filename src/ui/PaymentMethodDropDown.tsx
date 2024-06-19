import React, { useEffect, useRef, useState } from "react";
import { HiChevronDown } from "react-icons/hi2";

const PaymentMethodDropDown = () => {
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [paymentMethod, setPaymentMethod] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  console.log(paymentMethod);
  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (option: any) => {
    setIsOpen(false);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex flex-col">
      <div>Payment Method :</div>
      <div
        className="relative inline-block text-left w-[500px] ]"
        ref={dropdownRef}
      >
        <div
          className="w-full bg-white border border-gray-200 text-gray-700 py-2 px-4 rounded inline-flex justify-between options-center cursor-pointer dark:text-gray-400"
          onClick={handleToggle}
        >
          {paymentMethod ? (
            <span className="ml-2">{paymentMethod}</span>
          ) : (
            <span className="ml-2">Select Payment Method</span>
          )}
          <span
            className={`ml-2  ${
              isOpen ? "rotate-[540deg]" : ""
            } transition-all   duration-300`}
          >
            {" "}
            <HiChevronDown />{" "}
          </span>
        </div>

        {isOpen && (
          <div
            onClick={(e: any) => {
              setPaymentMethod(e.target.textContent);
              setIsOpen(false);
            }}
            className="absolute mt-2 w-full overflow-y-scroll bg-white border border-gray-200 rounded shadow-lg z-10"
          >
            <div className=" py-3  px-2 justify-around items-center  hover:bg-gray-200 cursor-pointer">
              Cash on Delivery
            </div>
            <div className=" py-3  px-2 justify-around items-center  hover:bg-gray-200 cursor-pointer">
              Credit Card
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentMethodDropDown;
