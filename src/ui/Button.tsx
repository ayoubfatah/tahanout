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
    <button
      disabled={disabled}
      className={`px-4 py-2  rounded-md mt-3 ${textColor} ${bgColor} ${borderColor} ${border} `}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;
