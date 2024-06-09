import React from "react";
import {
  HiChatBubbleLeftEllipsis,
  HiChevronDown,
  HiEnvelope,
  HiMoon,
} from "react-icons/hi2";
import { NavLink } from "react-router-dom";

export default function Header() {
  return (
    <div className="py-3 px-20 flex items-center gap-6 justify-end">
      <span className="text-[16px] font-[500]">Ayoub</span>
      <Avatar />
    </div>
  );
}

function Avatar() {
  return (
    <NavLink to="/profile">
      <img
        className="w-12 h-12 rounded-full border border-gray-00"
        src="https://cdn-icons-png.flaticon.com/512/1253/1253756.png"
        alt="user"
      />
    </NavLink>
  );
}
