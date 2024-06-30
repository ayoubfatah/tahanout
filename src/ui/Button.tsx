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
}) => {
  return (
    <div>
      {!disabled && (
        <div
          className={`flex ${bgColor} hover:${hoverColor} items-center  px-4 py-2 rounded-lg `}
        >
          <span className="text-green-400">{icon}</span>
          <button
            onClick={onClick}
            className={`${textColor} ${borderColor} ${border} `}
          >
            {text}
          </button>
        </div>
      )}

      {disabled && (
        <div
          className={`flex cursor-not-allowed bg-gray-500  hover:bg-gray-600 items-center  px-4 py-2 rounded-lg `}
        >
          <span className={"text-black cursor-not-allowed"}>{icon}</span>
          <button disabled className={`${textColor}  cursor-not-allowed `}>
            {text}
          </button>
        </div>
      )}
    </div>
  );
};

export default Button;
