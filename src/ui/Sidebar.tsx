import { FaBoxOpen, FaShoppingCart, FaUsers } from "react-icons/fa";
import { HiHome, HiMiniUserGroup } from "react-icons/hi2";
import {
  HiGlobeAsiaAustralia,
  HiMiniCog8Tooth,
  HiMiniUsers,
} from "react-icons/hi2";
import { NavLink } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="row-[1/-1] text-[16px] flex  flex-col  px-5 gap-3 items-center sticky font-[500]   dark:text-gray-500 dark:bg-gray-900 dark:border-r dark:border-gray-700 shadow-sm">
      <NavLink to="/" className="  text-gray-300  w-full py-5 px-2 ">
        Tahanout
      </NavLink>
      <NavLink
        to="/dashboard"
        className={({ isActive }) =>
          isActive
            ? "bg-gray-100 text-sky-400  dark:bg-gray-800  w-full  py-3 px-2  flex items-center gap-2"
            : "  dark:hover:bg-gray-800    hover:bg-gray-100 w-full  py-3 px-2  flex items-center gap-2"
        }
      >
        <HiHome size={24} />
        <span className="   ml-1  text-gray-600 dark:text-gray-100 ">
          Accueil
        </span>
      </NavLink>
      <NavLink
        to="/products"
        className={({ isActive }) =>
          isActive
            ? "bg-gray-100 text-sky-400  dark:bg-gray-800  w-full  py-3 px-2  flex items-center gap-2"
            : "  dark:hover:bg-gray-800    hover:bg-gray-100 w-full  py-3 px-2  flex items-center gap-2"
        }
      >
        <FaShoppingCart size={24} />
        <span className="   ml-1  text-gray-600 dark:text-gray-100 ">
          Produits
        </span>
      </NavLink>
      <NavLink
        to="/orders"
        className={({ isActive }) =>
          isActive
            ? "bg-gray-100 text-sky-400  dark:bg-gray-800  w-full  py-3 px-2  flex items-center gap-2"
            : "  dark:hover:bg-gray-800    hover:bg-gray-100 w-full  py-3 px-2  flex items-center gap-2"
        }
      >
        <FaBoxOpen size={24} />
        <span className="   ml-1  text-gray-600 dark:text-gray-100 ">
          Commandes
        </span>
      </NavLink>
      <NavLink
        to="/employees"
        className={({ isActive }) =>
          isActive
            ? "bg-gray-100 text-sky-400  dark:bg-gray-800  w-full  py-3 px-2  flex items-center gap-2"
            : "  dark:hover:bg-gray-800    hover:bg-gray-100 w-full  py-3 px-2  flex items-center gap-2"
        }
      >
        <HiMiniUserGroup size={24} />
        <span className="   ml-1  text-gray-600 dark:text-gray-100 ">
          Employés
        </span>
      </NavLink>
      <NavLink
        to="/customers"
        className={({ isActive }) =>
          isActive
            ? "bg-gray-100 text-sky-400  dark:bg-gray-800  w-full  py-3 px-2  flex items-center gap-2"
            : "  dark:hover:bg-gray-800    hover:bg-gray-100 w-full  py-3 px-2  flex items-center gap-2"
        }
      >
        <HiMiniUsers size={24} />
        <span className="   ml-1  text-gray-600 dark:text-gray-100 ">
          Clients
        </span>
      </NavLink>
      <NavLink
        to="/settings"
        className={({ isActive }) =>
          isActive
            ? "bg-gray-100 text-sky-400  dark:bg-gray-800  w-full  py-3 px-2  flex items-center gap-2"
            : "  dark:hover:bg-gray-800    hover:bg-gray-100 w-full  py-3 px-2  flex items-center gap-2"
        }
      >
        <HiMiniCog8Tooth size={24} />
        <span className="   ml-1  text-gray-600 dark:text-gray-100 ">
          Paramètres
        </span>
      </NavLink>
    </div>
  );
}
