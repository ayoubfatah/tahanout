import React, { cloneElement, useEffect, useRef, useState } from "react";
import { HiChevronDown } from "react-icons/hi2";
import { CustomersType, Product } from "../Types/types";
import { useTahanout } from "../contextApi/useTahanoutCA";
import { useTranslation } from "react-i18next";

type DropdownProps = {
  data: CustomersType[] | Product[];
  isLoading: boolean;
  children: any;
  type?: string;
};

const Dropdown: React.FC<DropdownProps> = ({
  type,
  data = [],
  isLoading,
  children,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<
    CustomersType | Product | null
  >(null);

  const {
    customerOptions,
    setCustomerOptions,
    productOptions,
    setProductOptions,
  } = useTahanout();

  const [searchTerm, setSearchTerm] = useState<string>("");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();
  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (item: CustomersType | Product) => {
    setSelectedOption(item);

    if (type === "customer") {
      setCustomerOptions(item as CustomersType);
    }
    if (type === "product") {
      setProductOptions(item as Product);
      setCustomerOptions(item as CustomersType);
    }
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
      className="relative inline-block text-left w-[500px] "
      ref={dropdownRef}
    >
      <div
        className="w-full bg-white dark:bg-gray-800 border dark:border-gray-600 border-gray-200 text-gray-700 py-2 px-4 rounded inline-flex justify-between items-center cursor-pointer dark:text-gray-400"
        onClick={handleToggle}
      >
        {selectedOption
          ? type === "customer"
            ? (selectedOption as CustomersType)?.fullName
            : (selectedOption as Product)?.name
          : type === "customer"
          ? t("Select a customer")
          : t("Select a product")}

        <span
          className={`ml-2  ${
            isOpen ? "rotate-[540deg]" : ""
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
