import { CreateEventButton } from "./CreateEventButton";
import { SmallCalender } from "./SmallCalender";
import { Labels } from "./Labels";
export const Sidebar = () => {
  return (
    <div>
      <aside className="border p-5 w-60 md:w-80">
        <CreateEventButton />
        <SmallCalender />
        <Labels />
      </aside>
    </div>
  );
};
