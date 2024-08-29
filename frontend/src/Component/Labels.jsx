import React, { useContext } from "react";
import { GlobleContext } from "../Context/GlobleContext";
import { toast } from "react-toastify";

export const Labels = () => {
  const { labels, updateLabel } = useContext(GlobleContext);
  console.log("labels:", labels);

  function changeHandler(e, lbl, title) {
    if (e.target.checked) {
      toast.warning("Task Updated");
    } else {
      toast.error("Task Removed");
    }
    updateLabel({ label: lbl, title: title, checked: e.target.checked });
  }

  return (
    <React.Fragment>
      <p className="text-gray-500 font-bold mt-10">Task Board</p>
      {labels.map(({ label: lbl, title: title, checked }, idx) => (
        <label key={idx} className="mt-3 items-center flex">
          <input
            type="checkbox"
            checked={checked}
            onChange={(e) => changeHandler(e, lbl, title)}
            className={`form-checkbox h-6 w-6 ${lbl} rounded focus:ring-0 cursor-pointer`}
          />
          <div
            className={`${lbl} ml-2 w-[50%] rounded text-center border shadow `}
          >
            <span className="ml-2 capitalize">{title}</span>
          </div>
        </label>
      ))}
    </React.Fragment>
  );
};
