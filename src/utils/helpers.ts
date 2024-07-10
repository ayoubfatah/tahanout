import { format, isToday, isYesterday, parseISO } from "date-fns";

export const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en", { style: "currency", currency: "USD" }).format(
    value
  );

export function formatDate(dateString: string): string {
  const date = parseISO(dateString);

  if (isToday(date)) {
    return "Today";
  } else if (isYesterday(date)) {
    return "Yesterday";
  } else {
    return format(date, "MMM d yyyy");
  }
}

export const formatTime = (date: Date) => {
  const hours = format(date, "HH");
  const minutes = format(date, "mm");

  return `${hours}h :${minutes}min `;
};

export const formatDateToMonthDay = (date: Date) => {
  return format(date, "MMM dd").toUpperCase();
};
