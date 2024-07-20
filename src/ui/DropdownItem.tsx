export default function DropdownItem({
  icon: Icon,
  text,
  onClick,
  disabled,
}: any) {
  return (
    <button
      className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-100  dark:hover:bg-gray-500 hover:bg-gray-100 disabled:opacity-50"
      onClick={onClick}
      disabled={disabled}
    >
      <div className="flex items-center  py-2 space-x-2">
        {Icon && <Icon className="w-5 h-5" />}
        <span>{text}</span>
      </div>
    </button>
  );
}

// import React, { useState, useEffect, useRef, ReactNode } from "react";

// import { HiChevronDown } from "react-icons/hi2";

// interface DropdownProps {
//   toggleButton: ReactNode;
//   children: ReactNode;
// }

// export default function DropdownItem({
//   toggleButton,
//   children,
// }: DropdownProps) {
//   const [isOpen, setIsOpen] = useState(false);
//   const dropdownRef = useRef<HTMLDivElement>(null);

//   const toggleDropdown = () => setIsOpen(!isOpen);

//   useEffect(() => {
//     function handleClickOutside(event: MouseEvent) {
//       if (
//         dropdownRef.current &&
// !dropdownRef.current.contains(event.target as Node)
//       ) {
//         setIsOpen(false);
//       }
//     }

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   return (
//     <div className="relative" ref={dropdownRef}>
//       <button onClick={toggleDropdown} className="flex items-center space-x-1">
//         {toggleButton}
//         <HiChevronDown className="w-4 h-4 text-gray-600" />
//       </button>
//       {isOpen && (
//         <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1">
//           {children}
//         </div>
//       )}
//     </div>
//   );
// }
