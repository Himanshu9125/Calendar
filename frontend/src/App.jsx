import "./App.css";
import React, { useContext, useEffect, useState } from "react";
import { getMonth } from "./util";
import { CalenderHearder } from "./Component/CalenderHearder";
import { Sidebar } from "./Component/Sidebar";
import { Month } from "./Component/Month";
import { GlobleContext } from "./Context/GlobleContext";
import { EventModel } from "./Component/EventModel";

function App() {
  const [currentMonth, setCurrentMonth] = useState(getMonth());
  const { monthIndex,showEventModel } = useContext(GlobleContext);
  useEffect(() => {
    setCurrentMonth(getMonth(monthIndex));
  }, [monthIndex]);
  return (
    <React.Fragment>
      {showEventModel &&
      <EventModel />
      }
      <div className="h-screen flex flex-col">
        <CalenderHearder />
        <div className="flex flex-1">
          <Sidebar />
          <Month month={currentMonth} />
        </div>
      </div>
    </React.Fragment>
  );
}

export default App;
