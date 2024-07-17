import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import DatePicker from "react-datepicker";
import { format, subDays } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";

const DateSelector = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([
    null,
    null,
  ]);

  const handleDateChange = (update: [Date | null, Date | null]) => {
    setDateRange(update);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const [start, end] = dateRange;
    if (start && end) {
      setSearchParams({
        start: format(start, "yyyy-MM-dd"),
        end: format(end, "yyyy-MM-dd"),
      });
    }
  };

  const customRanges = [
    {
      label: "Last 7 days",
      getValue: () => [subDays(new Date(), 7), new Date()],
    },
  ];

  return (
    <form onSubmit={handleSubmit} className="p-4">
      <div className="flex items-center gap-1">
        <DatePicker
          selectsRange={true}
          startDate={dateRange[0]}
          endDate={dateRange[1]}
          onChange={handleDateChange}
          className="bg-white border border-gray-300 rounded-md px-4  focus:outline-none focus:ring-2 focus:ring-blue-500"
          dateFormat="MMMM d, yyyy"
          showPopperArrow={false}
          maxDate={new Date()} // Block future dates
          customInput={
            <button
              type="button"
              className="bg-sky-500 text-gray-800 font-semibold py-1.5 px-4 rounded"
            >
              {dateRange[0] && dateRange[1]
                ? `${format(dateRange[0], "MMM d, yyyy")} - ${format(
                    dateRange[1],
                    "MMM d, yyyy"
                  )}`
                : "Select date"}
            </button>
          }
          renderCustomHeader={({
            date,
            decreaseMonth,
            increaseMonth,
            prevMonthButtonDisabled,
            nextMonthButtonDisabled,
          }) => (
            <div className="flex items-center   justify-between px-2 py-1">
              <button
                type="button"
                onClick={decreaseMonth}
                disabled={prevMonthButtonDisabled}
                className="text-gray-600 hover:text-gray-900"
              >
                {"<"}
              </button>
              <div className="text-lg font-bold">
                {format(date, "MMMM yyyy")}
              </div>
              <button
                type="button"
                onClick={increaseMonth}
                disabled={nextMonthButtonDisabled}
                className="text-gray-600 hover:text-gray-900"
              >
                {">"}
              </button>
            </div>
          )}
        >
          <div className="react-datepicker__custom-ranges">
            {customRanges.map((range, index) => (
              <button
                type="button"
                key={index}
                onClick={() =>
                  handleDateChange(range.getValue() as [Date, Date])
                }
                className="block   w-full text-left px-4 py-1 hover:bg-gray-100"
              >
                {range.label}
              </button>
            ))}
          </div>
        </DatePicker>
        <button
          type="submit"
          className="bg-sky-500 hover:bg-sky-600 text-white font-semibold text-[14px] py-2 px-4 rounded"
        >
          Apply
        </button>
      </div>
    </form>
  );
};

export default DateSelector;
