import React, { useState, useRef, useEffect, cloneElement } from "react";
import { CustomersType } from "../../Types/types";
import { HiChevronDown } from "react-icons/hi2";
import CustomerOptions from "../Customers/CustomerOptions";

type DropdownProps = {
  data: CustomersType[];
  isLoading: boolean;
  children: any;
};

const Dropdown: React.FC<DropdownProps> = ({
  data = [],
  isLoading,
  children,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<CustomersType | null>(
    null
  );
  const [searchTerm, setSearchTerm] = useState<string>("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (item: CustomersType) => {
    setSelectedOption(item);
    setIsOpen(false);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
      setSearchTerm("");
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      className="relative inline-block text-left w-[500px] mt-[50px]"
      ref={dropdownRef}
    >
      <div
        className="w-full bg-white border border-gray-200 text-gray-700 py-2 px-4 rounded inline-flex justify-between items-center cursor-pointer dark:text-gray-400"
        onClick={handleToggle}
      >
        {selectedOption ? selectedOption.fullName : "Select an option"}

        <span
          className={`ml-2  ${
            isOpen ? "rotate-180" : ""
          } transition-all   duration-300`}
        >
          {" "}
          <HiChevronDown />{" "}
        </span>
      </div>
      {isOpen &&
        cloneElement(children, {
          handleSelect,
          setSearchTerm,
          searchTerm,
          isLoading,
          data,
        })}
    </div>
  );
};

export default Dropdown;
