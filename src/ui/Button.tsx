import React from "react";

interface ButtonProps {
  text: string;
  textColor: string;
  bgColor: string;
  borderColor?: string;
  border?: string;
  disabled?: boolean;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({
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
