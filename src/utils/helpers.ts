import {
  format,
  isSameDay,
  isToday,
  isYesterday,
  parseISO,
  subDays,
  subWeeks,
  subMonths,
  subYears,
  startOfMonth,
  endOfMonth,
  startOfYear,
  endOfYear,
  endOfWeek,
  startOfWeek,
} from "date-fns";

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

export const filteredByDates = (data: any, date: Date) => {
  return data.filter((data: any) => isSameDay(date, new Date(data.createdAt)));
};

export function getDateInterval(numDays: any) {
  let start, end;

  if (numDays === 7) {
    // This week
    start = startOfWeek(new Date(), { weekStartsOn: 1 });
    end = endOfWeek(new Date(), { weekStartsOn: 1 });
  } else if (numDays === 14) {
    // Last week
    start = startOfWeek(subWeeks(new Date(), 1), { weekStartsOn: 1 });
    end = endOfWeek(subWeeks(new Date(), 1), { weekStartsOn: 1 });
  } else if (numDays === 30) {
    // This month
    start = startOfMonth(new Date());
    end = endOfMonth(new Date());
  } else if (numDays === 31) {
    // Last month
    start = startOfMonth(subMonths(new Date(), 1));
    end = endOfMonth(subMonths(new Date(), 1));
  } else if (numDays === 365) {
    // This year
    start = startOfYear(new Date());
    end = endOfYear(new Date());
  } else if (numDays === 366) {
    // Last year
    start = startOfYear(subYears(new Date(), 1));
    end = endOfYear(subYears(new Date(), 1));
  } else {
    // Custom interval
    start = subDays(new Date(), numDays - 1);
    end = numDays === 2 ? new Date(Date.now() - 864e5) : new Date();
  }

  return { start, end };
}
