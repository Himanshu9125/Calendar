import { useContext, useState } from "react";
import { GlobleContext } from "../Context/GlobleContext";
import { toast } from "react-toastify";

export const EventModel = () => {
  const lablsClasses = [
    "bg-indigo-500",
    "bg-gray-500",
    "bg-green-500",
    "bg-red-500",
    "bg-blue-500",
    "bg-purple-500",
  ];
  const { setEventModel, daySelected, dispatchCalEvent, seletedEvent } =
    useContext(GlobleContext);
  const [title, setTitle] = useState(seletedEvent ? seletedEvent.title : "");
  const [description, setDescription] = useState(
    seletedEvent ? seletedEvent.description : ""
  );
  const [selectedlable, setSelectedlable] = useState(
    seletedEvent
      ? lablsClasses.find((lbl) => lbl === seletedEvent.label)
      : lablsClasses[0]
  );

  function handleSubmit(e) {
    e.preventDefault();
    const calendarEvent = {
      title,
      description,
      label: selectedlable,
      day: daySelected.valueOf(),
      id: seletedEvent ? seletedEvent.id : Date.now(),
    };
    if (seletedEvent) {
      dispatchCalEvent({ type: "update", payload: calendarEvent });
    } else {
      dispatchCalEvent({ type: "push", payload: calendarEvent });
    }
    setEventModel(false);
    toast.success("Task Added");
  }
  return (
    <div className="h-screen w-full fixed left-0 top-0 flex items-center justify-center">
      <form className="bg-white rounded-xl  shadow-2xl w-1/2 md:w-1/4">
        <header className="bg-gray-100 px-4 py-2 flex rounded-t-xl justify-between items-center">
          <span className="material-icons-outlined text-gray-400">
            drag_handle
          </span>
          <div>
            {seletedEvent && (
              <span
                onClick={() => {
                  dispatchCalEvent({
                    type: "delete",
                    payload: seletedEvent,
                  });
                  toast.error("Task Removed");
                  setEventModel(false);
                }}
                className="material-icons-outlined text-gray-400"
              >
                delete
              </span>
            )}
          </div>
          <button onClick={() => setEventModel(false)}>
            <span className="material-icons-outlined text-gray-400">close</span>
          </button>
        </header>
        <div className="p-3">
          <div className=" grid grid-cols-1/5 items-end gap-y-7">
            <div></div>
            <input
              type="text"
              name="title"
              placeholder="Add Title"
              value={title}
              required
              className="pt-3 border-b-2 text-gray-600 text-xl font-semibold pb-2 w-full"
              onChange={(e) => setTitle(e.target.value)}
            />
            <span className="material-icons-outlined text-gray-400">
              schedule
            </span>
            <p>{daySelected.format("dddd,MMMM DD")}</p>
            <span className="material-icons-outlined text-gray-400">
              segment
            </span>
            <input
              type="text"
              name="description"
              placeholder="Add a description"
              value={description}
              required
              className="pt-3 border-b-2 text-gray-600 text-xl font-semibold pb-2 w-full"
              onChange={(e) => setDescription(e.target.value)}
            />
            <span className="material-icons-outlined text-gray-400">
              bookmark_border
            </span>
            <div className="flex gap-x-2">
              {lablsClasses.map((lblClass, i) => (
                <span
                  key={i}
                  onClick={() => {
                    setSelectedlable(lblClass);
                  }}
                  className={`${lblClass} w-6 h-6 rounded-full flex items-center justify-center cursor-pointer`}
                >
                  {selectedlable === lblClass && (
                    <span className="material-icons-outlined text-white">
                      check
                    </span>
                  )}
                </span>
              ))}
            </div>
          </div>
        </div>
        <footer className="flex justify-end w-100 border-t p-3 mt-5">
          <button
            type="submit"
            onClick={handleSubmit}
            className="bg-blue-500 hover:bg-blue-600 px-6 py-2 rounded text-white"
          >
            Save
          </button>
        </footer>
      </form>
    </div>
  );
};
