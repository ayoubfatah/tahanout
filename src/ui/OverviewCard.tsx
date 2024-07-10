import useCountUp from "../hooks/useCountUp";
import { formatCurrency } from "../utils/helpers";

const colorClasses: any = {
  green: "bg-green-100 text-green-600",
  blue: "bg-blue-100 text-blue-600",
  indigo: "bg-indigo-100 text-indigo-600",
  yellow: "bg-yellow-100 text-yellow-600",
  teal: "bg-teal-100 text-teal-600",
};
export const OverviewCard = ({
  title,
  value,
  icon,
  iconColor,
  format,
  numDays,
}: {
  title: string;
  value: number;
  icon: React.ReactNode;
  iconColor: string;
  format?: boolean;
  numDays: number;
}) => {
  const speed = numDays < 7 ? 200 : 800;
  const animatedValue = useCountUp(value, speed);

  return (
    <div className="bg-white px-2 py-5 flex gap-5 shadow-sm rounded-md items-center hover:scale-[1.03] duration-300 transition-all">
      <div className={`${colorClasses[iconColor]} p-4 rounded-full`}>
        {icon}
      </div>
      <div>
        <h2 className="text-[15px] font-semibold text-gray-500 mb-1">
          {title}
        </h2>
        <p className="text-gray-700 font-semibold text-[20px]">
          {format ? formatCurrency(animatedValue) : animatedValue}
        </p>
      </div>
    </div>
  );
};
