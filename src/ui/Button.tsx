import React from "react";
import { ButtonType } from "../Types/types";

const Button: React.FC<ButtonType> = ({
  text,
  textColor = "text-white",
  bgColor = "bg-blue-500",
  onClick,
  borderColor,
  border,
  hoverColor,
  disabled = false,
  icon = null,
  type = "button",
}) => {
  return (
    <span className="inline-block">
      {!disabled && (
        <div
          onClick={onClick}
          className={`flex  ${borderColor} ${border} ${bgColor} cursor-pointer hover:${hoverColor} items-center  px-4 py-2 rounded-lg `}
        >
          <span className="text-green-400">{icon}</span>
          <button type={type} className={`${textColor}  `}>
            {text}
          </button>
        </div>
      )}

      {disabled && (
        <div
          onClick={onClick}
          className={`flex ${borderColor} ${border} cursor-not-allowed bg-gray-500  hover:bg-gray-600 items-center  px-4 py-2 rounded-lg `}
        >
          <span className={"text-black cursor-not-allowed"}>{icon}</span>
          <button
            type={type}
            disabled
            className={`${textColor}  cursor-not-allowed `}
          >
            {text}
          </button>
        </div>
      )}
    </span>
  );
};

export default Button;
