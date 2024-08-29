import { useEffect, useMemo, useReducer, useState } from "react";
import dayjs from "dayjs";
import { GlobleContext } from "./GlobleContext";

function saveEventReducer(state, { type, payload }) {
  switch (type) {
    case "push":
      return [...state, payload];
    case "update":
      return state.map((evt) => (evt.id === payload.id ? payload : evt));
    case "delete":
      return state.filter((evt) => evt.id !== payload.id);
    default:
      throw new Error();
  }
}

function initEvents() {
  const storageEvents = localStorage.getItem("savedEvents");
  const parsedEvents = storageEvents ? JSON.parse(storageEvents) : [];
  return parsedEvents;
}

export const ContextWrapper = (props) => {
  const [monthIndex, setMonthIndex] = useState(dayjs().month());
  const [smallCalendarMonth, setSmallCalendarMonth] = useState(null);
  const [daySelected, setDaySelected] = useState(dayjs());
  const [showEventModel, setEventModel] = useState(false);
  const [seletedEvent, setSelectedEvent] = useState();
  const [labels, setLabels] = useState([]);
  const [savedEvent, dispatchCalEvent] = useReducer(
    saveEventReducer,
    [],
    initEvents
  );

  useEffect(() => {
    localStorage.setItem("savedEvent", JSON.stringify(savedEvent));
  }, [savedEvent]);
  const filteredEvents = useMemo(() => {
    return savedEvent.filter((evt) =>
      labels
        .filter((lbl) => lbl.checked)
        .map((lbl) => lbl.label)
        .includes(evt.label)
    );
  }, [savedEvent, labels]);
  useEffect(() => {
    setLabels((prevLabels) => {
      // Flatten the labels array if evt.label is an array, otherwise create an array with label and title
      const allLabels = savedEvent
        .flatMap((evt) =>
          Array.isArray(evt.label)
            ? evt.label.map((label) => ({ label, title: evt.title })) // If it's an array, map it to an array of objects
            : evt.label
            ? [{ label: evt.label, title: evt.title }]
            : []
        )
        .filter(Boolean); // Filter out any undefined or null values

      console.log(allLabels); // Debug: Check the output of allLabels

      // Use a Set to ensure unique label-title pairs
      const uniqueLabels = [
        ...new Map(allLabels.map((item) => [item.label, item])).values(),
      ];

      return uniqueLabels.map(({ label, title }) => {
        const currLabel = prevLabels.find((lbl) => lbl.label === label);
        return {
          label,
          title, // Keep the title associated with the label
          checked: currLabel ? currLabel.checked : true,
        };
      });
    });
  }, [savedEvent]);

  useEffect(() => {
    if (!showEventModel) {
      setSelectedEvent(null);
    }
  }, [showEventModel]);

  useEffect(() => {
    if (smallCalendarMonth !== null) {
      setMonthIndex(smallCalendarMonth);
    }
  }, [smallCalendarMonth]);
  function updateLabel(label) {
    setLabels(labels.map((lbl) => (lbl.label === label.label ? label : lbl)));
  }

  return (
    <GlobleContext.Provider
      value={{
        monthIndex,
        setMonthIndex,
        smallCalendarMonth,
        setSmallCalendarMonth,
        daySelected,
        setDaySelected,
        showEventModel,
        setEventModel,
        dispatchCalEvent,
        savedEvent,
        seletedEvent,
        setSelectedEvent,
        labels,
        setLabels,
        updateLabel,
        filteredEvents,
      }}
    >
      {props.children}
    </GlobleContext.Provider>
  );
};
