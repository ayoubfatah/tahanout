import React, { useState, useEffect, useRef } from "react";
import {
  HiOutlineEnvelope,
  HiOutlineBell,
  HiOutlineMoon,
  HiMiniArrowRightStartOnRectangle,
  HiChevronDown,
  HiMiniLanguage,
  HiOutlineUserCircle,
} from "react-icons/hi2";
import { useLogout } from "../features/authentication/useLogout";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const { mutate: logout, isLoading } = useLogout();
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const userDropdownRef = useRef<HTMLDivElement>(null);
  const languageDropdownRef = useRef<HTMLDivElement>(null);

  const toggleUserDropdown = () => setIsUserDropdownOpen(!isUserDropdownOpen);
  const toggleLanguageDropdown = () =>
    setIsLanguageDropdownOpen(!isLanguageDropdownOpen);

  useEffect(() => {
    function handleClickOutside(event: any) {
      if (
        userDropdownRef.current &&
        !userDropdownRef.current.contains(event.target as Node)
      ) {
        setIsUserDropdownOpen(false);
      }
      if (
        languageDropdownRef.current &&
        !languageDropdownRef.current.contains(event.target as Node)
      ) {
        setIsLanguageDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="bg-white sticky top-0  z-[1000]  py-4 px-6 flex items-center border-b border-gray-200  justify-end">
      <div className="flex items-center gap-5 space-x-4">
        <button
          onClick={() => {
            /* Toggle dark mode */
          }}
        >
          <HiOutlineMoon className="w-6 h-6 text-gray-600" />
        </button>
        <div className="relative" ref={languageDropdownRef}>
          <button
            onClick={toggleLanguageDropdown}
            className="flex items-center space-x-1"
          >
            <HiMiniLanguage className="w-6 h-6 text-gray-600" />
            <HiChevronDown className="w-4 h-4 text-gray-600" />
          </button>
          {isLanguageDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg ">
              <DropdownItem
                text="English"
                onClick={() => {
                  /* Change language */
                }}
              />
              <DropdownItem
                text="Español"
                onClick={() => {
                  /* Change language */
                }}
              />
              <DropdownItem
                text="Français"
                onClick={() => {
                  /* Change language */
                }}
              />
            </div>
          )}
        </div>
        <div className="relative" ref={userDropdownRef}>
          <button
            onClick={toggleUserDropdown}
            className="flex items-center space-x-2"
          >
            <Avatar />
            <HiChevronDown className="w-4 h-4 text-gray-600" />
          </button>
          {isUserDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1">
              <DropdownItem
                icon={HiOutlineUserCircle}
                text="profile"
                onClick={() => {
                  navigate("/profile");
                }}
              />
              <DropdownItem
                icon={HiOutlineBell}
                text="notifications"
                onClick={() => {
                  /* Handle notifications */
                }}
              />
              <DropdownItem
                icon={HiOutlineEnvelope}
                text="messages"
                onClick={() => {
                  /* Handle messages */
                }}
              />
              <DropdownItem
                icon={HiMiniArrowRightStartOnRectangle}
                text="Logout"
                onClick={logout}
                disabled={isLoading}
              />
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

function DropdownItem({ icon: Icon, text, onClick, disabled }: any) {
  return (
    <button
      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 disabled:opacity-50"
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

function Avatar() {
  return (
    <div className="flex items-center space-x-2">
      <img
        src="https://i.pravatar.cc/150?img=1"
        alt="User Avatar"
        className="w-8 h-8 rounded-full"
      />
      <div>
        <p className="text-sm font-medium text-gray-700">John Doe</p>
        <p className="text-xs text-gray-500">Admin</p>
      </div>
    </div>
  );
}
