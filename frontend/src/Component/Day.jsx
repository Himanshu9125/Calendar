import dayjs from "dayjs";
import { useContext, useEffect, useState } from "react";
import { GlobleContext } from "../Context/GlobleContext";

export const Day = ({ day, rowIdx }) => {
  const { setDaySelected, setEventModel, filteredEvents, setSelectedEvent } =
    useContext(GlobleContext);
  const [dayEvent, setDayEvent] = useState([]);

  useEffect(() => {
    const event = filteredEvents.filter(
      (evt) => dayjs(evt.day).format("DD-MM-YY") === day.format("DD-MM-YY")
    );
    setDayEvent(event);
  }, [filteredEvents, day]);

  function getCurrtDayClass(day) {
    return day.format("DD-MM-YY") === dayjs().format("DD-MM-YY")
      ? "bg-blue-600 text-white rounded-full w-7"
      : "";
  }

  return (
    <div className="border border-gray-200 flex flex-col">
      <header className="flex flex-col items-center">
        {rowIdx === 0 && (
          <p className="text-sm m-1">{day.format("ddd").toUpperCase()}</p>
        )}
        <p className={`text-sm p-1 my-1 text-center ${getCurrtDayClass(day)}`}>
          {day.format("DD")}
        </p>
      </header>
      <div
        className="flex-1 cursor-pointer"
        onClick={() => {
          setDaySelected(day);
          setEventModel(true);
        }}
      >
        {dayEvent.map((evt, idx) => (
          <div
            key={idx}
            onClick={() => {
              setSelectedEvent(evt);
            }}
            className={`${evt.label} p-1 mr-3 text-gray-600 text-sm rounded mb-1 truncate`}
          >
            {evt.title}
          </div>
        ))}
      </div>
    </div>
  );
};
