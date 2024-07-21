import useCountUp from "../hooks/useCountUp";
import { formatCurrency } from "../utils/helpers";

export const OverviewCard = ({
  title,
  value,
  icon,
  iconColor,
  format,
  numDays,
  percentage,
}: {
  title: string;
  value: number;
  icon: React.ReactNode;
  iconColor: string;
  format?: boolean;
  numDays: number;
  percentage?: boolean;
}) => {
  const speed =
    value < 20
      ? 10
      : value < 50
      ? 50
      : value < 200
      ? 200
      : value > 1000
      ? 600
      : value;

  const animatedValue = useCountUp(value, speed);

  return (
    <div className="bg-white dark:bg-gray-800 px-2 py-5 flex gap-5 shadow-sm rounded-md items-center hover:scale-[1.03] ">
      <div className={`${iconColor} p-4 rounded-full`}>{icon}</div>
      <div>
        <h2 className="text-[15px] font-semibold text-gray-500 dark:text-gray-400   mb-1">
          {title}
        </h2>
        <p className="text-gray-700 dark:text-gray-200  font-semibold text-[20px]">
          {format ? formatCurrency(animatedValue) : animatedValue}
          {percentage && "%"}
        </p>
      </div>
    </div>
  );
};
