import React, { useState, useRef, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { OrderType } from "../Types/types";
import { useTranslation } from "react-i18next";

const SearchInput = ({ items, filterKeys, onFilter, order }: any) => {
  const [searchTerm, setSearchTerm] = useState("");
  const { t } = useTranslation();
  const inputRef = useRef<HTMLInputElement>(null);
  const placeholder = order
    ? `${t("Order ID or Customer Name")} ...`
    : `${t("search")} ...`;
  useEffect(() => {
    // Initial filter to display all items when component mounts
    onFilter(items);
  }, [items, onFilter]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.toLowerCase();
    setSearchTerm(value);

    let filteredItems = [];
    if (order) {
      // If order is true, filter by order.id
      filteredItems = items.filter(
        (item: any) =>
          item?.id.toString().includes(value) ||
          item?.customers.fullName.includes(value)
      );
    } else {
      // Otherwise, filter by the specified keys
      filteredItems = items.filter((item: any) =>
        filterKeys.some((key: any) => item[key]?.toLowerCase().includes(value))
      );
    }
    onFilter(filteredItems);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (inputRef.current && !inputRef.current.contains(event.target as Node)) {
      setSearchTerm("");
      onFilter(items); // Reset to original items
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [items, onFilter]);

  return (
    <div ref={inputRef} className="my-3 relative flex items-center w-[300px]">
      <FaSearch className="absolute left-3 text-gray-300  cursor-pointer" />
      <input
        type="text"
        placeholder={placeholder}
        value={searchTerm}
        onChange={handleSearch}
        className="w-full  pl-10 pr-3 py-2 border  dark:bg-gray-900  border-gray-300 rounded-full focus:outline-none focus:ring focus:ring-sky-500"
      />
    </div>
  );
};

export default SearchInput;
