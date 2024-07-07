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
    <div className="row-[1/-1] text-[16px] flex  flex-col py-10 px-6 gap-5 items-center sticky font-[500] text-grey-600 shadow-sm">
      <NavLink to="/" className=" w-full mb-4">
        Tahanout
      </NavLink>
      <NavLink
        to="/dashboard"
        className={({ isActive }) =>
          isActive
            ? "bg-gray-100 text-sky-400 w-full  py-3 px-2  flex items-center gap-2"
            : "hover:bg-gray-100 w-full  py-3 px-2  flex items-center gap-2"
        }
      >
        <HiHome size={25} />
        <span className="text-grey-600">Home</span>{" "}
      </NavLink>
      {/*  */}
      <NavLink
        to="/products"
        className={({ isActive }) =>
          isActive
            ? "bg-gray-100 text-sky-400 w-full  py-3 px-2  flex items-center gap-2"
            : "hover:bg-gray-100 w-full  py-3 px-2  flex items-center gap-2"
        }
      >
        <FaShoppingCart size={25} />
        <span className="text-grey-600">Products</span>{" "}
      </NavLink>
      {/*  */}
      <NavLink
        to="/orders"
        className={({ isActive }) =>
          isActive
            ? "bg-gray-100 text-sky-400 w-full  py-3 px-2  flex items-center gap-2"
            : "hover:bg-gray-100 w-full  py-3 px-2  flex items-center gap-2"
        }
      >
        <FaBoxOpen size={25} />
        <span className="text-grey-600">Orders</span>{" "}
      </NavLink>
      {/*  */}
      <NavLink
        to="/employees"
        className={({ isActive }) =>
          isActive
            ? "bg-gray-100 text-sky-400 w-full  py-3 px-2  flex items-center gap-2"
            : "hover:bg-gray-100 w-full  py-3 px-2  flex items-center gap-2"
        }
      >
        <HiMiniUserGroup size={25} />
        <span className="text-grey-600">Employees</span>{" "}
      </NavLink>
      <NavLink
        to="/customers"
        className={({ isActive }) =>
          isActive
            ? "bg-gray-100 text-sky-400 w-full  py-3 px-2  flex items-center gap-2"
            : "hover:bg-gray-100 w-full  py-3 px-2  flex items-center gap-2"
        }
      >
        <HiMiniUsers size={25} />
        <span className="text-grey-600">Customers</span>{" "}
      </NavLink>{" "}
      {/*  */}{" "}
      <NavLink
        to="/settings"
        className={({ isActive }) =>
          isActive
            ? "bg-gray-100 text-sky-400 w-full  py-3 px-2  flex items-center gap-2"
            : "hover:bg-gray-100 w-full  py-3 px-2  flex items-center gap-2"
        }
      >
        <HiMiniCog8Tooth size={25} />
        <span className="text-grey-600">Settings</span>{" "}
      </NavLink>
    </div>
  );
}
