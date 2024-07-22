import { useEffect, useRef, useState } from "react";
import {
  HiChevronDown,
  HiMiniArrowRightStartOnRectangle,
  HiMiniLanguage,
  HiMiniSun,
  HiOutlineMoon,
  HiOutlineUserCircle,
} from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import { useTahanout } from "../contextApi/useTahanoutCA";
import { useLogout } from "../features/authentication/useLogout";
import { useUser } from "../features/authentication/useUser";
import { changeLanguage } from "../utils/helpers";
import Avatar from "./Avatar";
import DropdownItem from "./DropdownItem";

export default function Header() {
  const { user } = useUser();
  const { email, fullName, role, avatar } = user?.user_metadata || {};

  const { mutate: logout, isLoading } = useLogout();
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const userDropdownRef = useRef<HTMLDivElement>(null);
  const languageDropdownRef = useRef<HTMLDivElement>(null);
  const { isDarkMode, toggleDarkMode } = useTahanout();

  const toggleUserDropdown = () => setIsUserDropdownOpen(!isUserDropdownOpen);
  const toggleLanguageDropdown = () =>
    setIsLanguageDropdownOpen(!isLanguageDropdownOpen);

  useEffect(() => {
    function handleClickOutside(event: any) {
      if (
        userDropdownRef.current &&
        !userDropdownRef.current.contains(event.target)
      ) {
        setIsUserDropdownOpen(false);
      }
      if (
        languageDropdownRef.current &&
        !languageDropdownRef.current.contains(event.target)
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
    <header className=" dark:bg-gray-900  bg-white  sticky top-0  z-[20]  py-2 px-6 flex items-center border-b border-gray-200  dark:border-gray-700  justify-end">
      <div className="flex items-center gap-5 space-x-4">
        <button onClick={toggleDarkMode}>
          {isDarkMode ? (
            <HiMiniSun className="w-6 h-6 text-gray-600 dark:text-gray-100" />
          ) : (
            <HiOutlineMoon className="w-6 h-6 text-gray-600 dark:text-gray-100" />
          )}
        </button>
        <div className="relative" ref={languageDropdownRef}>
          <button
            onClick={toggleLanguageDropdown}
            className="flex items-center space-x-1"
          >
            <HiMiniLanguage className="w-6 h-6 text-gray-600 dark:text-gray-100 " />
            <HiChevronDown className="w-4 h-4 text-gray-600 dark:text-gray-100" />
          </button>
          {isLanguageDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 dark:!text-gray-300 dark:bg-gray-800 bg-white rounded-md shadow-lg ">
              <DropdownItem
                text="English"
                onClick={() => {
                  changeLanguage("en");
                  setIsLanguageDropdownOpen(false);
                }}
              />
              <DropdownItem
                text="Arabic"
                onClick={() => {
                  changeLanguage("ar");
                  setIsLanguageDropdownOpen(false);
                }}
              />
              <DropdownItem
                text="Français"
                onClick={() => {
                  changeLanguage("fr");
                  setIsLanguageDropdownOpen(false);
                }}
              />
            </div>
          )}
        </div>
        <div className="relative" ref={userDropdownRef}>
          <button
            onMouseEnter={toggleUserDropdown}
            className="flex items-center space-x-2"
          >
            <Avatar fullName={fullName} role={role} avatar={avatar} />
            <HiChevronDown className="w-4 h-4 text-gray-600 dark:text-gray-100" />
          </button>
          {isUserDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-gray-50 dark:bg-gray-800 rounded-md shadow-lg ">
              <DropdownItem
                icon={HiOutlineUserCircle}
                text="Profile"
                onClick={() => {
                  navigate("/profile");
                  setIsUserDropdownOpen(false);
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
