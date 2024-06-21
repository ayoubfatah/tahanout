import React from "react";
import { ButtonType } from "../Types/types";

const Button: React.FC<ButtonType> = ({
  text,
  textColor = "text-white",
  bgColor = "bg-blue-500",
  onClick,
  borderColor,
  border,
  disabled = false,
}) => {
  return (
    <div>
      {!disabled && (
        <button
          onClick={onClick}
          className={`${textColor} ${bgColor} ${borderColor} ${border} px-4 py-2 rounded-lg`}
        >
          {text}
        </button>
      )}

      {disabled && (
        <button
          disabled
          className={`${textColor} cursor-not-allowed bg-gray-500 px-4 py-2 rounded-lg`}
        >
          {text}
        </button>
      )}
    </div>
  );
};

export default Button;
