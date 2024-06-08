import { Children } from "react";

export default function Button({ text, color }: any) {
  return (
    <button className={`text-white ${color} px-4 py-2 rounded-md mt-5`}>
      {" "}
      {text}{" "}
    </button>
  );
}
