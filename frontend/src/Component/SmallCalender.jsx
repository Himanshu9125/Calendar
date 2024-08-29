import React, { useEffect, useState, useContext } from "react";
import dayjs from "dayjs";
import { getMonth } from "../util";
import { GlobleContext } from "../Context/GlobleContext";

export const SmallCalender = () => {
  const { monthIndex, setSmallCalendarMonth, setDaySelected, daySelected } =
    useContext(GlobleContext);
  const [currentMonthIdx, setCurrentMonthIdx] = useState(dayjs().month());
  const [currentMonth, setCurrentMonth] = useState(getMonth(currentMonthIdx));

  // Update currentMonth when currentMonthIdx changes
  useEffect(() => {
    setCurrentMonth(getMonth(currentMonthIdx));
  }, [currentMonthIdx]);
  console.log(currentMonth);
  // Update currentMonth when monthIndex changes
  useEffect(() => {
    setCurrentMonthIdx(monthIndex);
    setCurrentMonth(getMonth(monthIndex));
  }, [monthIndex]);

  function handlePrevMonth() {
    setCurrentMonthIdx(currentMonthIdx - 1);
  }

  function handleNextMonth() {
    setCurrentMonthIdx(currentMonthIdx + 1);
  }

  function getCurrtDayClass(day) {
    const format = "DD-MM-YY";
    const nowDay = dayjs().format(format);
    const currDay = day.format(format);
    const slcDay = daySelected && daySelected.format(format);
    if (nowDay === currDay) {
      return "bg-blue-600 text-white rounded-full w-[25px] h-[26px]";
    } else if (currDay === slcDay) {
      return "bg-blue-100 text-blue-600 font-bold rounded-full w-[25px] h-[26px]";
    } else {
      return "";
    }
  }

  return (
    <div className="mt-9">
      <header className="flex justify-between">
        <p className="text-gray-500 md:text-xl font-bold text-[14px]">
          {dayjs(new Date(dayjs().year(), currentMonthIdx)).format("MMMM YYYY")}
        </p>
        <div>
          <button>
            <span
              className="material-icons-outlined cursor-pointer text-gray-600 mx-2"
              onClick={handlePrevMonth}
            >
              chevron_left
            </span>
          </button>
          <button>
            <span
              className="material-icons-outlined cursor-pointer text-gray-600 mx-2"
              onClick={handleNextMonth}
            >
              chevron_right
            </span>
          </button>
        </div>
      </header>
      <div className="grid grid-cols-7 grid-rows-6">
        {currentMonth[0].map((day, i) => (
          <span key={i} className="text-center text-sm py-1">
            {day.format("dd").charAt(0)}
          </span>
        ))}
        {currentMonth.map((row, i) => (
          <React.Fragment key={i}>
            {row.map((day, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setSmallCalendarMonth(currentMonthIdx);
                  setDaySelected(day);
                }}
                className={`py-1 w-full ${getCurrtDayClass(day)}`}
              >
                <span className="text-sm">{day.format("D")}</span>
              </button>
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};
